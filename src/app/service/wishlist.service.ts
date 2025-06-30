import { Injectable } from '@angular/core';
import { WishlistStore } from '../store/wishlist.store';
import { Product } from '../model/productInterface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private wishlistStore: WishlistStore) {}

  getWishlistItems(): Observable<Product[]> {
    return this.wishlistStore.vm$.pipe(
      map(vm => vm.items)
    );
  }

  getWishlistCount(): Observable<number> {
    return this.wishlistStore.vm$.pipe(
      map(v => v.itemCounts)
    );
  }

  addToWishlist(product: Product): void {
    this.wishlistStore.addToWishlist(product);
  }

  removeFromWishlist(productId: number): void {
    this.wishlistStore.removeFromWishlist(productId);
  }

  clearWishlist(): void {
    this.wishlistStore.clearWishlist();
  }

  isInWishlist(productId: number): Observable<boolean> {
    return this.wishlistStore.isInWishlist(productId);
  }
}
