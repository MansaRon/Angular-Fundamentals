// cart.store.ts
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Product } from '../model/productInterface';

export interface CartState {
  productsInCart: Product[];
}

@Injectable()
export class CartStore extends ComponentStore<CartState> {
  constructor() {
    super({
      productsInCart: [] // Initial cart state
    });
  }

  // SELECTORS
  readonly productsInCart$ = this.select(state => state.productsInCart);

  // UPDATERS

  // Replace the entire cart
  readonly setProductsInCart = this.updater<Product[]>(
    (state, products) => ({ ...state, productsInCart: products })
  );

  // Add a product to the cart
  readonly addToCart = this.updater<Product>(
    (state, product) => ({
      ...state,
      productsInCart: [...state.productsInCart, product]
    })
  );

  // Remove a product by ID
  readonly removeFromCart = this.updater<number>(
    (state, productId) => ({
      ...state,
      productsInCart: state.productsInCart.filter(p => p.id !== productId)
    })
  );
}
