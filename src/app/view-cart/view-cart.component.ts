import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { Product } from '../data/productInterface';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  products?: Product[];
  numberOfItems: number = 0;
  cartTotal: number = 0;
  tax: number = 0;
  loader = false;

  constructor(private ecommerce: EcommerceserviceService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    const storedCart = sessionStorage.getItem('cart');
    this.loader = true;
    if (storedCart) {
      this.products = JSON.parse(storedCart) as Product[];
    }
    console.log('Loaded cart:', this.products);
  }

  removeItem(itemNumber: number) {
    console.log(itemNumber);
    this.ecommerce.removeFromCart(itemNumber);
    this.loadCart();
  }

  // Increase the quantity of a specific item
  increaseQuantity(productId: number) {
    this.ecommerce.increaseQuantity(productId);  // Call the service to increase the quantity
    this.loadCart();  // Reload the cart to reflect changes
  }

  // Decrease the quantity of a specific item
  decreaseQuantity(productId: number) {
    this.ecommerce.decreaseQuantity(productId);  // Call the service to decrease the quantity
    this.loadCart();  // Reload the cart to reflect changes
  }

  getCartTotal(): number {
    return this.cartTotal = this.ecommerce.getCartTotal();
  }

  getTaxAmount(): number {
    return this.tax = this.ecommerce.getTaxAmount();
  }

}
