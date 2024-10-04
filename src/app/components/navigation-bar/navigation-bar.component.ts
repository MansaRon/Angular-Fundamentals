import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/productInterface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  productsInCart?: Product[] = [];

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      this.productsInCart = JSON.parse(storedCart) as Product[]; // Parse and assign to productsInCart
    }
  }

  viewItemsInCart() {
    this.router.navigate(['/view-cart']);
  }

}
