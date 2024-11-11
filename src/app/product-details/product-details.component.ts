import { Component, OnInit } from '@angular/core';
import { Product } from '../model/productInterface';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { map, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  filterText: string = '';

  constructor(
    private ecommerce: EcommerceserviceService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,) {}
  
  ngOnInit(): void {
    this.products = this.activatedRoute.snapshot.data['details'];
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      this.productsInCart = JSON.parse(storedCart) as Product[]; // Parse and assign to productsInCart
    }
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
  }

  viewCartModel() {
    this.isCartModalOpen = !this.isCartModalOpen;
  }

  onSearchTextChanged(searchText: string) {
    this.filterText = searchText; // Update the searchText variable
  }

  onSortSelected(sortString: string) {
    this.ecommerce
    .getCartSortBy(sortString)
    .pipe(
      map(productSort => (this.products = productSort)),
      tap((_) => (this.loader = true)))
      .subscribe();
  }
}
