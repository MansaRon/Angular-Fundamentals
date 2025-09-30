import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Product } from '../model/productInterface';

export interface CartState {
  productsInCart: Product[];
  isLoading: boolean;
  error?: string | null;
}

export const initialCartState: CartState = {
  productsInCart: [],
  isLoading: false,
  error: null,
};

@Injectable()
export class CartStore extends ComponentStore<CartState> {
  constructor() {
    super(initialCartState);
  }

  // SELECTORS
  private readonly productsInCart$ = this.select((state) => state.productsInCart);
  private readonly isLoading$ = this.select((state) => state.isLoading);
  private readonly error$ = this.select((state) => state.error);

  private readonly cartTotal$ = this.select(this.productsInCart$, (products) =>
    products.reduce((total, product) => total + product.price * (product.quantity || 1), 0),
  );

  private readonly promotionalDiscount$ = this.select(() => 50);

  private readonly taxAmount$ = this.select(this.cartTotal$, (total) => total * 0.1);

  private readonly totalWithTax$ = this.select(
    this.cartTotal$,
    this.taxAmount$,
    this.promotionalDiscount$,
    (total, tax, discount) => total + tax - discount,
  );

  // VM (View Model) that combines the cart state
  vm$ = this.select({
    productsInCart: this.productsInCart$,
    cartTotal: this.cartTotal$,
    taxAmount: this.taxAmount$,
    promotionalDiscount: this.promotionalDiscount$,
    totalWithTax: this.totalWithTax$,
    isLoading: this.isLoading$,
    error: this.error$,
  });

  // UPDATERS

  // Replace the entire cart
  readonly setProductsInCart = this.updater<Product[]>((state, products) => ({
    ...state,
    productsInCart: products,
  }));

  readonly clearCart = this.updater((state) => ({
    ...state,
    productsInCart: [],
  }));

  // Add a product to the cart
  readonly addToCart = this.updater<Product>((state, product) => {
    const existingProduct = state.productsInCart.find((p) => p.id === product.id);
    if (existingProduct) {
      return {
        ...state,
        productsInCart: state.productsInCart.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + (product.quantity || 1) } : p,
        ),
      };
    }
    return {
      ...state,
      productsInCart: [
        ...state.productsInCart,
        {
          ...product,
          quantity: product.quantity || 1,
        },
      ],
    };
  });

  readonly removeFromCart = this.updater<number>((state, productId) => ({
    ...state,
    productsInCart: state.productsInCart.filter((p) => p.id !== productId),
  }));

  readonly updateQuantity = this.updater<{ productId: number; quantity: number }>(
    (state, { productId, quantity }) => ({
      ...state,
      productsInCart: state.productsInCart.map((p) =>
        p.id === productId ? { ...p, quantity } : p,
      ),
    }),
  );

  readonly increaseQuantity = this.updater<number>((state, productId) => ({
    ...state,
    productsInCart: state.productsInCart.map((p) =>
      p.id === productId ? { ...p, quantity: (p.quantity || 1) + 1 } : p,
    ),
  }));

  readonly decreaseQuantity = this.updater<number>((state, productId) => ({
    ...state,
    productsInCart: state.productsInCart.map((p) =>
      p.id === productId && (p.quantity || 1) > 1 ? { ...p, quantity: (p.quantity || 1) - 1 } : p,
    ),
  }));
}
