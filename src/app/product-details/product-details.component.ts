import { Component, OnInit } from '@angular/core';
import { Product } from '../data/productInterface';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  showModal: boolean = false;
  selectedProduct!: Product;
  products: Product[] = [];

  constructor(private ecommerce: EcommerceserviceService) {}
  
  ngOnInit(): void {
    this.ecommerce.getProducts()
    .pipe(map(product => (this.products = product)))
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
