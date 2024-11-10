import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../model/product';
import { Product } from '../model/productInterface';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { map } from 'rxjs';
import { state } from '@angular/animations';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.css']
})
export class ProductShopComponent implements OnInit  {
  product?: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ecommerce: EcommerceserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
    //this.loadSingleProduct(id);
  }

  addToCart(product?: Product) {
    if (product) {
      product.quantity = 1;
      this.ecommerce.addToCart(product);
      this.router.navigate(['/product-details']);
    }
  }

}
