import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/productInterface';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommerceserviceService {

  private cart: Product[] = [];
  url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { 
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart); // Load from localStorage
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
    .pipe(
      shareReplay(),
    );
  }

  getSingleProduct(params: number): Observable<Product>{
    return this.http.get<Product>(`https://fakestoreapi.com/products/${params}`);
  }

  addToCart(product: Product) {
    const existingProduct = this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }
    this.saveCart();
  }

  getCartItems(): Product[] {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) { 
      this.cart = JSON.parse(savedCart) as Product[];
    } else {
      this.cart = [];
    }
    return this.cart;
  }

  private saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(productId: number) {
    const savedCart = sessionStorage.getItem('cart');
  
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }

    const index = this.cart.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }

  increaseQuantity(productId: number) {
    const product = this.cart.find(p => p.id === productId);
    if (product) {
      product.quantity++;
      this.saveCart();
    }
  }
  
  decreaseQuantity(productId: number) {
    const product = this.cart.find(p => p.id === productId);
    if (product && product.quantity > 1) {
      product.quantity--;
      this.saveCart();
    }
  }

  getCartTotal(): number {
    if (this.cart.length === 0) return 0; // Handle empty cart case
    return this.getCartItems().reduce((total, product) => total + product.price * product.quantity, 0);
  }    

  getTaxAmount(): number {
    return this.getCartTotal() * 0.10;
  }

  getTotalWithTax(): number {
    const cartTotal = this.getCartTotal();
    const tax = this.getTaxAmount();
    return cartTotal + tax;
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
