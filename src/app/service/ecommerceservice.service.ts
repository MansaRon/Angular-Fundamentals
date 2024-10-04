import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../model/product';
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
      console.log(`Product with ID ${productId} removed from cart.`);
      console.log('Updated cart:', this.cart);
    } else {
      console.log(`Product with ID ${productId} not found in the cart.`);
    }
  }

    // Method to increase the quantity of a specific product
    increaseQuantity(productId: number) {
      const product = this.cart.find(p => p.id === productId);
      if (product) {
        product.quantity++;
        console.log(product);
        this.saveCart(); // Save updated cart
      }
    }
  
    // Method to decrease the quantity of a specific product
    decreaseQuantity(productId: number) {
      const product = this.cart.find(p => p.id === productId);
      if (product && product.quantity > 1) {
        product.quantity--;
        console.log(product);
        this.saveCart(); // Save updated cart
      }
    }

  // New function to calculate the total cost of all items in the cart
  getCartTotal(): number {
    return this.cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0); // Start with 0 as the initial value
  }  

  getTaxAmount(): number {
    return this.getCartTotal() * 0.10;
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
