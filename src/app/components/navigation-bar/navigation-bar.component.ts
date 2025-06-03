import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/model/productInterface';
import { WishlistService } from 'src/app/service/wishlist.service';
import { CartService } from 'src/app/service/cart.service';
import { WishlistStore } from 'src/app/store/wishlist.store';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  productsInCart$!: Observable<Product[]>;
  wishListItems$!: Observable<Product[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private cartService: CartService,
    private wishListStore: WishlistStore
  ) {}
  
  ngOnInit(): void {
    this.productsInCart$ = this.cartService.getProductsInCart().pipe(
      takeUntil(this.destroy$)
    );
    this.wishListItems$ = this.wishListStore.wishListItems$;
  }

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
