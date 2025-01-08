import { Component } from '@angular/core';
import { Product } from '../model/productInterface';
import { WishlistService } from '../service/wishlist.service';
import { EcommerceserviceService } from '../service/ecommerceservice.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  wishlistItems: Product[] = [];

  showWishListNotification: boolean = false;

  showCartNotification: boolean = false;

  message: string = 'Your wishlist is currently empty.';

  constructor(private wishListService: WishlistService,
              private ecommerce: EcommerceserviceService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistItems = this.wishListService.getWishList();
  }

  removeItem(item: Product): void {
    this.wishListService.removeItemFromWishlist(item.id);
    this.showWishListNotification = true;
    this.loadWishlist();
    setTimeout(() => {
      this.showWishListNotification = false;
    }, 3000);
  }

  addToCart(item: Product) {
    this.ecommerce.addToCart(item);
    this.showCartNotification = true;
    setTimeout(() => {
      this.showCartNotification = false;
    }, 3000);
  }

}
