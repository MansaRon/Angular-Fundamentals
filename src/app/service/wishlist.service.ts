import { Injectable } from '@angular/core';
import { Product } from '../model/productInterface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }

  getWishList() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  }

  addToWishList(item: Product) {
    const wishlist: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  removeItemFromWishlist(itemId: number) {
    const wishlist: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = wishlist.filter(item => item.id !== itemId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  }

  clearWishlist() {
    localStorage.removeItem('wishlist');
  }
}
