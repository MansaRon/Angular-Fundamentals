import { Component, OnInit } from '@angular/core';
import { Product } from '../data/productInterface';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';

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
  productsInCart?: Product[] = [];
  isCartModalOpen = false; // Controls modal visibility

  constructor(private ecommerce: EcommerceserviceService, private router: Router) {}
  
  ngOnInit(): void {
    this.getProducts();
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      this.productsInCart = JSON.parse(storedCart) as Product[]; // Parse and assign to productsInCart
    }
    console.log('Product in cart:', this.productsInCart);
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

  openViewCart() {
    this.isCartModalOpen = true;
    console.log('click me')
  }

  // Function to open the modal
  viewCartModel() {
    this.isCartModalOpen = !this.isCartModalOpen;
    console.log('Cart Modal State:', this.isCartModalOpen);
  }

}
