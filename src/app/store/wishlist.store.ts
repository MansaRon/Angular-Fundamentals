import { ComponentStore } from '@ngrx/component-store';
import { Product } from '../model/productInterface';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface WishlistState {
  items: Product[];
}

export const initialWishlistState: WishlistState = {
  items: []
};

@Injectable({
  providedIn: 'root'
})
export class WishlistStore extends ComponentStore<WishlistState> {
  constructor() {
    super(initialWishlistState);
  }

  private readonly items$ = this.select(state => state.items);
  private readonly itemCount$ = this.select(state => state.items.length);

  // VM stands for View Model
  vm$ = this.select(
    this.items$,
    this.itemCount$,
    (items, itemCount) => ({ items, itemCount })
  );

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
