import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartStore } from '../store/cart.store';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent {
  constructor(
    private cartStore: CartStore,
    private router: Router,
  ) {}

  onReturnShopping() {
    this.cartStore.setProductsInCart([]);
    this.router.navigate(['/']);
  }
}
