import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceserviceService } from '../../service/ecommerceservice.service';
import { WishlistService } from '../../service/wishlist.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/model/productInterface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  productsInCart$: Observable<Product[]>;
  wishListItems$: Observable<any[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private ecommerce: EcommerceserviceService,
    private wishlistService: WishlistService,
    private router: Router
  ) {
    this.productsInCart$ = this.ecommerce.getCartItems();
    this.wishListItems$ = this.wishlistService.getWishlistItems();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  viewItemsInCart(): void {
    this.router.navigate(['/view-cart']);
  }

  viewWishList(): void {
    this.router.navigate(['/wishlist']);
  }
}
