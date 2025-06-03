import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/productInterface';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { WishlistService } from '../service/wishlist.service';
import { Subject, timer, takeUntil } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.css']
})
export class ProductShopComponent implements OnInit, OnDestroy {
  product?: Product;
  showNotification: boolean = false;
  inWishList: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private ecommerce: EcommerceserviceService,
    private router: Router,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addToCart(product?: Product) {
    if (product) {
      product.quantity = 1;
      this.ecommerce.addToCart(product);
      this.router.navigate(['/product-details']);
    }
  }

  addToWishList(product?: Product) {
    if (product) {
      if (!this.inWishList) {
        this.wishlistService.addToWishlist(product);
        this.inWishList = !this.inWishList;
        this.showNotification = true;
      } else {
        this.wishlistService.removeFromWishlist(product.id);
        this.inWishList = !this.inWishList;
        this.showNotification = true;
      }

      timer(3000).pipe(
        takeUntil(this.destroy$),
        tap(() => this.showNotification = false)
      ).subscribe();
    }
  }
}
