import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Product } from '../model/productInterface';
import { Observable, map } from 'rxjs';

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

  readonly cartTotal$ = this.select(
    this.productsInCart$,
    (products) => products.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0)
  );

  readonly taxAmount$ = this.select(
    this.cartTotal$,
    (total) => total * 0.10
  );

  readonly totalWithTax$ = this.select(
    this.cartTotal$,
    this.taxAmount$,
    (total, tax) => total + tax
  );

  // UPDATERS

  // Replace the entire cart
  readonly setProductsInCart = this.updater<Product[]>(
    (state, products) => ({ ...state, productsInCart: products })
  );

  // Add a product to the cart
  readonly addToCart = this.updater<Product>(
    (state, product) => {
      const existingProduct = state.productsInCart.find(p => p.id === product.id);
      if (existingProduct) {
        return {
          ...state,
          productsInCart: state.productsInCart.map(p =>
            p.id === product.id
              ? { ...p, quantity: (p.quantity || 1) + (product.quantity || 1) }
              : p
          )
        };
      }
      return {
        ...state,
        productsInCart: [...state.productsInCart, { ...product, quantity: product.quantity || 1 }]
      };
    }
  );

  // Remove a product by ID
  readonly removeFromCart = this.updater<number>(
    (state, productId) => ({
      ...state,
      productsInCart: state.productsInCart.filter(p => p.id !== productId)
    })
  );

  readonly updateQuantity = this.updater<{ productId: number; quantity: number }>(
    (state, { productId, quantity }) => ({
      ...state,
      productsInCart: state.productsInCart.map(p =>
        p.id === productId ? { ...p, quantity } : p
      )
    })
  );

  readonly increaseQuantity = this.updater<number>(
    (state, productId) => ({
      ...state,
      productsInCart: state.productsInCart.map(p =>
        p.id === productId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      )
    })
  );

  readonly decreaseQuantity = this.updater<number>(
    (state, productId) => ({
      ...state,
      productsInCart: state.productsInCart.map(p =>
        p.id === productId && (p.quantity || 1) > 1
          ? { ...p, quantity: (p.quantity || 1) - 1 }
          : p
      )
    })
  );
}
