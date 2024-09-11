import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../data/product';
import { Product } from '../data/productInterface';
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
    const id = Number(this.activatedRoute.snapshot.paramMap.get("productId"));
    this.loadSingleProduct(id);
  }

  loadSingleProduct(id: number) {
    this.ecommerce.getSingleProduct(id)
    .pipe(
      map((response) => (this.product = response))
    )
    .subscribe();
  }

  addToCart(product?: Product) {
    this.router.navigate(['/product-details'], {state: { productCart: product }});
  }

}
