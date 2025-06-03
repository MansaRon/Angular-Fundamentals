import { ComponentStore } from '@ngrx/component-store';
import { Product } from '../model/productInterface';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface WishlistState {
  items: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class WishlistStore extends ComponentStore<WishlistState> {
  constructor() {
    super({ items: [] });
  }

  readonly items$ = this.select(state => state.items);
  readonly itemCount$ = this.select(state => state.items.length);

  readonly addToWishlist = this.updater((state: WishlistState, item: Product) => ({
    items: [...state.items, item]
  }));

  readonly removeFromWishlist = this.updater((state: WishlistState, itemId: number) => ({
    items: state.items.filter(item => item.id !== itemId)
  }));

  readonly clearWishlist = this.updater((state: WishlistState) => ({
    items: []
  }));

  readonly isInWishlist = (productId: number) => this.select(
    state => state.items.some(item => item.id === productId)
  );
}
