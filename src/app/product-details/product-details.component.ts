import { Component, OnInit } from '@angular/core';
import { Products } from '../data/product';
import { Product } from '../data/productInterface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  showModal: boolean = false;
  selectedProduct!: Product;
  products : Product[] = Products;
  
  ngOnInit(): void {
    fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => console.log(json))
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }

}
