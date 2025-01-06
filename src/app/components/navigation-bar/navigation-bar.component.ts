import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/productInterface';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  productsInCart?: Product[] = [];
  wishListItems?: Product[] = [];

  constructor(private router: Router, private wishListService: WishlistService) {}
  
  ngOnInit(): void {
    const storedCart = sessionStorage.getItem('cart');
    const storedWishList = this.wishListService.getWishList();
    if (storedCart) {
      this.productsInCart = JSON.parse(storedCart) as Product[]; // Parse and assign to productsInCart
    }
    if (storedWishList) {
      this.wishListItems = storedWishList; // Parse and assign to wishListItems
    }
  }

  viewItemsInCart() {
    this.router.navigate(['/view-cart']);
  }

  viewWishList() {
    this.router.navigate(['/wishlist']);
  }

}
