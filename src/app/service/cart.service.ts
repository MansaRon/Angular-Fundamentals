import { Injectable } from '@angular/core';
import { CartStore } from '../store/cart.store';
import { Product } from '../model/productInterface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private cartStore: CartStore) {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      this.cartStore.setProductsInCart(JSON.parse(savedCart));
    }
  }

  getProductsInCart(): Observable<Product[]> {
    return this.cartStore.productsInCart$.pipe(
      tap(products => this.saveCart(products))
    );
  }

  getCartTotal(): Observable<number> {
    return this.cartStore.cartTotal$;
  }

  getTaxAmount(): Observable<number> {
    return this.cartStore.taxAmount$;
  }

  getTotalWithTax(): Observable<number> {
    return this.cartStore.totalWithTax$;
  }

  addToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }

  removeFromCart(productId: number): void {
    this.cartStore.removeFromCart(productId);
  }

  increaseQuantity(productId: number): void {
    this.cartStore.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartStore.decreaseQuantity(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartStore.updateQuantity({ productId, quantity });
  }

  clearCart(): void {
    this.cartStore.setProductsInCart([]);
  }

  private saveCart(products: Product[]): void {
    sessionStorage.setItem('cart', JSON.stringify(products));
  }
} 