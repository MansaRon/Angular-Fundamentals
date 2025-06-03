import { Component, OnInit, OnDestroy } from '@angular/core';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { Product } from '../model/productInterface';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  cartTotal$: Observable<number>;
  taxAmount$: Observable<number>;
  totalWithTax$: Observable<number>;
  message: string = 'Your shopping cart is currently empty.';
  private destroy$ = new Subject<void>();

  constructor(
    private ecommerce: EcommerceserviceService,
    private router: Router
  ) {
    this.products$ = this.ecommerce.getCartItems();
    this.cartTotal$ = this.ecommerce.getCartTotal();
    this.taxAmount$ = this.ecommerce.getTaxAmount();
    this.totalWithTax$ = this.ecommerce.getTotalWithTax();
  }
  
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeItem(itemNumber: number): void {
    this.ecommerce.removeFromCart(itemNumber);
  }

  increaseQuantity(productId: number): void {
    this.ecommerce.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.ecommerce.decreaseQuantity(productId);
  }

  clearCart(): void {
    this.ecommerce.clearCart();
  }

  navigateToCheckout(): void {
    this.router.navigateByUrl('/checkout');
  }
}
