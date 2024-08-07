import { Component, OnInit } from '@angular/core';
import { Products } from '../data/product';
import { Product } from '../data/productInterface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products : Product[] = Products;
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
