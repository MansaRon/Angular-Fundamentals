import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/productInterface';
import { map, shareReplay } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class EcommerceserviceService {
  url = 'https://fakestoreapi.com/products';

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
    .pipe(
      shareReplay(),
    );
  }

  getSingleProduct(params: number): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${params}`);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getCartItems(): Observable<Product[]> {
    return this.cartService.getProductsInCart();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }
  
  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  getCartTotal(): Observable<number> {
    return this.cartService.getCartTotal();
  }    

  getTaxAmount(): Observable<number> {
    return this.cartService.getTaxAmount();
  }

  getTotalWithTax(): Observable<number> {
    return this.cartService.getTotalWithTax();
  }  

  clearCart(): void {
    this.cartService.clearCart();
  }

  sortProducts(products: Product[], sortType: string): Product[] {
    switch (sortType) {
      case 'name-asc':
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating-asc':
        return [...products].sort((a, b) => (a.rating?.rate ?? 0) - (b.rating?.rate ?? 0));
      case 'rating-desc':
        return [...products].sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
      default:
        return products;
    }
  }
}
