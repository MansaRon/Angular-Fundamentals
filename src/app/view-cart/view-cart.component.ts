import { Component, OnInit } from '@angular/core';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { Product } from '../model/productInterface';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  products?: Product[];
  cartTotal: number = 0;
  tax: number = 0;
  loader = false;

  constructor(private ecommerce: EcommerceserviceService) {}
  
  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    const storedCart = sessionStorage.getItem('cart');
    this.loader = true;
    if (storedCart) {
      this.products = JSON.parse(storedCart) as Product[];
      this.getCartTotal();
    }
    console.log(this.products);
  }

  removeItem(itemNumber: number) {
    this.ecommerce.removeFromCart(itemNumber);
    this.loadCart();
  }

  increaseQuantity(productId: number) {
    this.ecommerce.increaseQuantity(productId);
    this.loadCart();
  }

  decreaseQuantity(productId: number) {
    this.ecommerce.decreaseQuantity(productId);
    this.loadCart();
  }

  getCartTotal(): number {
    return this.cartTotal = this.ecommerce.getCartTotal();
  }

  getTaxAmount(): number {
    return this.tax = this.ecommerce.getTaxAmount();
  }

  clearCart() {
    this.loadCart();
    this.products = [];
    sessionStorage.removeItem('cart');
  }

}
