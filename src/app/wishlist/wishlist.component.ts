import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../model/productInterface';
import { WishlistService } from '../service/wishlist.service';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { Observable, Subject, timer, takeUntil } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistItems$: Observable<Product[]>;
  showWishListNotification: boolean = false;
  showCartNotification: boolean = false;
  message: string = 'Your wishlist is currently empty.';
  private destroy$ = new Subject<void>();

  constructor(
    private wishlistService: WishlistService,
    private ecommerce: EcommerceserviceService
  ) {
    this.wishlistItems$ = this.wishlistService.getWishlistItems();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeItem(item: Product): void {
    this.wishlistService.removeFromWishlist(item.id);
    this.showWishListNotification = true;
    timer(3000).pipe(
      takeUntil(this.destroy$),
      tap(() => this.showWishListNotification = false)
    ).subscribe();
  }

  addToCart(item: Product): void {
    this.ecommerce.addToCart(item);
    this.showCartNotification = true;
    timer(3000).pipe(
      takeUntil(this.destroy$),
      tap(() => this.showCartNotification = false)
    ).subscribe();
  }
}
