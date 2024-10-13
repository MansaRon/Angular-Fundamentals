import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/productInterface';
import { map } from 'rxjs';

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
    return this.http.get<Product[]>(this.url);
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
    return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }    

  getTaxAmount(): number {
    return this.getCartTotal() * 0.10;
  }

  getTotalWithTax(): number {
    const cartTotal = this.getCartTotal();
    const tax = this.getTaxAmount();
    return cartTotal + tax;
  }  
  
  getCartSortBy(sortString: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        return this.sortProducts(products, sortString);
      })
    )
  }

  private sortProducts(products: Product[], sortType: string): Product[] {
    switch (sortType) {
      case 'name-asc': // Name A-Z
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc': // Name Z-A
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case 'price-asc': // Price Low to High
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc': // Price High to Low
        return products.sort((a, b) => b.price - a.price);
      case 'rating-asc': // Rating Low to High
        return products.sort((a, b) => {
          const ratingA = a.rating?.rate ?? 0;
          const ratingB = b.rating?.rate ?? 0;
          return ratingA - ratingB;
        });
      case 'rating-desc': // Rating High to Low
        return products.sort((a, b) => {
          const ratingA = a.rating?.rate ?? 0;
          const ratingB = b.rating?.rate ?? 0;
          return ratingB - ratingA;
        });
      default:
        return products; // Return unsorted if no valid sort type
    }
  }
}
