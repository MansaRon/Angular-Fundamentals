import { ComponentStore } from '@ngrx/component-store';
import { Product } from '../model/productInterface';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface WishlistState {
  items: Product[];
  isLoading: boolean;
  error?: string | null;
}

export const initialWishlistState: WishlistState = {
  items: [],
  isLoading: false,
  error: null
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
  private readonly isLoading$ = this.select(state => state.isLoading);
  private readonly error$ = this.select(state => state.error);

  // VM stands for View Model
  vm$ = this.select({
    items: this.items$,
    itemCounts: this.itemCount$,
    isLoading: this.isLoading$,
    error: this.error$
  });

  readonly addToWishlist = this.updater((state: WishlistState, item: Product) => ({
    ...state,
    items: [
      ...state.items, 
      item
    ]
  }));

  readonly removeFromWishlist = this.updater((state: WishlistState, itemId: number) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId)
  }));

  readonly clearWishlist = this.updater((state: WishlistState) => ({
    ...state,
    items: []
  }));

  readonly isInWishlist = (productId: number) => this.select(
    state => state.items.some(item => item.id === productId)
  );
}
