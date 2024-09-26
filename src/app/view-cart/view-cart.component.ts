import { Component, DoCheck, OnInit } from '@angular/core';
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

  constructor(private ecommerce: EcommerceserviceService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    const storedCart = sessionStorage.getItem('cart');
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

}
