import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../data/product';
import { Product } from '../data/productInterface';

@Injectable({
  providedIn: 'root'
})
export class EcommerceserviceService {

  private cart: Product[] = [];
  url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { 
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart); // Load from localStorage
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getSingleProduct(params: number): Observable<Product>{
    return this.http.get<Product>(`https://fakestoreapi.com/products/${params}`);
  }

  addToCart(product: Product) {
    this.cart.push(product);
    this.saveCart(); // Save to localStorage
    console.log('Product added to cart:', product);
    console.log('Current cart:', this.cart);
  }

  getCartItems(): Product[] {
    console.log('Retrieving cart items:', this.cart);
    return this.cart;
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
