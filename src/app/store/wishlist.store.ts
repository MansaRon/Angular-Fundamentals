import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Product } from "../model/productInterface";

export interface WishlistState {
    wishListItems: Product[];
}

@Injectable()
export class WishlistStore extends ComponentStore<WishlistState> {
  constructor() {
    super({
      wishListItems: []
    });

    // Optional: Load from sessionStorage at startup
    const storedWishlist = sessionStorage.getItem('wishlist');
    if (storedWishlist) {
      const parsed = JSON.parse(storedWishlist) as Product[];
      this.setWishListItems(parsed);
    }

    // Optional: Persist to sessionStorage on state changes
    this.wishListItems$.subscribe(items => {
      sessionStorage.setItem('wishlist', JSON.stringify(items));
    });
  }

  // SELECTOR
  readonly wishListItems$ = this.select(state => state.wishListItems);

  // UPDATERS
  readonly setWishListItems = this.updater<Product[]>(
    (state, items) => ({ 
        ...state, 
        wishListItems: items 
    })
  );

  readonly addToWishList = this.updater<Product>(
    (state, item) => ({
      ...state,
      wishListItems: [...state.wishListItems, item]
    })
  );

  readonly removeFromWishList = this.updater<number>(
    (state, productId) => ({
      ...state,
      wishListItems: state.wishListItems.filter(p => p.id !== productId)
    })
  );

  readonly clearWishList = this.updater(
    state => ({ 
        ...state, 
        wishListItems: [] 
    })
  );
}
