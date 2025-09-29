import { Injectable } from '@angular/core';
import { CartStore } from '../store/cart.store';
import { Product } from '../model/productInterface';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private cartStore: CartStore) {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      this.cartStore.setProductsInCart(JSON.parse(savedCart));
    }
  }

  getProductsInCart(): Observable<Product[]> {
    return this.cartStore.vm$.pipe(
      tap((vm) => this.saveCart(vm.productsInCart)),
      map((vm) => vm.productsInCart),
    );
  }

  getCartTotal(): Observable<number> {
    return this.cartStore.vm$.pipe(map((vm) => vm.cartTotal));
  }

  getPromotionalDiscount(): Observable<number> {
    return this.cartStore.vm$.pipe(map((v) => v.promotionalDiscount));
  }

  getTaxAmount(): Observable<number> {
    return this.cartStore.vm$.pipe(map((v) => v.taxAmount));
  }

  getTotalWithTax(): Observable<number> {
    return this.cartStore.vm$.pipe(map((v) => v.totalWithTax));
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
