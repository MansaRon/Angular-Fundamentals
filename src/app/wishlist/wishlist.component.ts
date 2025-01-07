import { Component } from '@angular/core';
import { Product } from '../model/productInterface';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  wishlistItems: Product[] = [];

  showNotification: boolean = false;

  message: string = 'Your wishlist is currently empty.';

  constructor(private wishListService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistItems = this.wishListService.getWishList();
    console.log(this.wishlistItems);
  }

  removeItem(item: Product): void {
    this.wishListService.removeItemFromWishlist(item.id);
    this.loadWishlist();
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

}
