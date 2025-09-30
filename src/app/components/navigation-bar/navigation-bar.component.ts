import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceserviceService } from '../../service/ecommerceservice.service';
import { WishlistService } from '../../service/wishlist.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/model/productInterface';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  productsInCart$: Observable<Product[]>;
  wishListItems$: Observable<Product[]>;
  private destroy$ = new Subject<void>();
  isLogged$ = this.authService.isLogged$;

  constructor(
    private ecommerce: EcommerceserviceService,
    private wishlistService: WishlistService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.productsInCart$ = this.ecommerce.getCartItems().pipe(takeUntil(this.destroy$));
    this.wishListItems$ = this.wishlistService.getWishlistItems().pipe(takeUntil(this.destroy$));
  }

  ngOnInit(): void {}

  viewItemsInCart(): void {
    this.router.navigate(['/view-cart']);
  }

  viewWishList(): void {
    this.router.navigate(['/wishlist']);
  }
}
