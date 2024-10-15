import { Component, OnInit } from '@angular/core';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { Product } from '../model/productInterface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  products?: Product[];
  loader = false;

  constructor(private ecommerce: EcommerceserviceService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadCart();
  }

  public loadCart() {
    this.loader = true;
    this.products = this.ecommerce.getCartItems();
    this.getCartTotal();
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
    return this.ecommerce.getCartTotal();
  }

  getTaxAmount(): number {
    return this.ecommerce.getTaxAmount();
  }

  getTotalWithTax(): number {
    return this.ecommerce.getTotalWithTax();
  }

  clearCart() {
    this.products = [];
    sessionStorage.clear();
  }

  navigateToCheckout() {
    this.router.navigateByUrl('/checkout');
  }

}
