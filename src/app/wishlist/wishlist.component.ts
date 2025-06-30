import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../model/productInterface';
import { WishlistService } from '../service/wishlist.service';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { Observable, Subject, timer, takeUntil } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WishlistStore } from '../store/wishlist.store';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  showWishListNotification: boolean = false;
  showCartNotification: boolean = false;
  message: string = 'Your wishlist is currently empty.';
  private destroy$ = new Subject<void>();
  vm$ = this.wishlistStore.vm$;

  constructor(
    private wishlistService: WishlistService,
    private ecommerce: EcommerceserviceService,
    private wishlistStore: WishlistStore,
  ) {}

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
