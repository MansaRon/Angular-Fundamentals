import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/productInterface';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.css']
})
export class ProductShopComponent implements OnInit  {
  product?: Product;
  showNotification: boolean = false;
  inWishList: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ecommerce: EcommerceserviceService,
    private router: Router,
    private wishList: WishlistService
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  addToCart(product?: Product) {
    if (product) {
      product.quantity = 1;
      this.ecommerce.addToCart(product);
      this.router.navigate(['/product-details']);
    }
  }

  addToWishList(product?: Product) {
    if (product) {
      if (!this.inWishList) {
        this.wishList.addToWishList(product);
        this.inWishList = !this.inWishList;
        this.showNotification = true;
      } else {
        this.wishList.removeItemFromWishlist(product.id);
        this.inWishList = !this.inWishList;
        this.showNotification = true;
      }

      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }

}
