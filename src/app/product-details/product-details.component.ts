import { Component, OnInit } from '@angular/core';
import { Products } from '../data/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products = Products;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
