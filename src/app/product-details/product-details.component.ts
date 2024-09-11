import { Component, OnInit } from '@angular/core';
import { Product } from '../data/productInterface';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  showModal: boolean = false;
  selectedProduct!: Product;
  products: Product[] = [];
  loader = false;
  productsInCart: Product[] = [];
  productInCart?: Product;

  constructor(private ecommerce: EcommerceserviceService) {}
  
  ngOnInit(): void {
    this.getProducts();
    const navigation = window.history.state;
    this.productInCart = navigation.productCart as Product;

    if (this.productInCart) {
      this.productsInCart.push(this.productInCart);
      console.log('Product in cart:', this.productsInCart);
    } else {
      console.error('No product found in cart');
    }
  }

  getProducts() {
    this.ecommerce.getProducts()
    .pipe(
      map(product => (
        this.products = product
      )),
      tap((_) => (this.loader = true))
    )
    .subscribe();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }

}
