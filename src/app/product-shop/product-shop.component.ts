import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../data/product';
import { Product } from '../data/productInterface';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.css']
})
export class ProductShopComponent implements OnInit  {
  product?: Product;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get("productId"));
    this.product = Products.find(findProduct => findProduct.id === id);
  }

}
