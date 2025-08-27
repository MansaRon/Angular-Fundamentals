import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../model/productInterface';
import { WishlistService } from '../service/wishlist.service';
import { Observable, Subject, take } from 'rxjs';
import { ProductDetailsStore } from '../store/product-details.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ProductDetailsStore],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  selectedProduct!: Product;
  isCartModalOpen = false;

  // Store observables
  vm$ = this.productDetailsStore.vm$;

  private destroy$ = new Subject<void>();

  constructor(
    private wishlistService: WishlistService,
    private router: Router,
    public productDetailsStore: ProductDetailsStore,
  ) {}

  ngOnInit(): void {
    // Initialize the store to load products
    this.productDetailsStore.initialize();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.showModal = true;
  }

  openViewCart(): void {
    this.isCartModalOpen = true;
  }

  viewCartModel(): void {
    this.isCartModalOpen = !this.isCartModalOpen;
  }

  onSearchTextChanged(searchText: string): void {
    this.productDetailsStore.updateFilterText(searchText);
  }

  onSortSelected(sortString: string): void {
    this.productDetailsStore.updateSortType(sortString);
  }

  toggleWishlist(product: Product): void {
    this.isInWishlist(product.id)
      .pipe(take(1))
      .subscribe((isInWishlist) => {
        if (isInWishlist) {
          this.wishlistService.removeFromWishlist(product.id);
        } else {
          this.wishlistService.addToWishlist(product);
        }
      });
  }

  isInWishlist(productId: number): Observable<boolean> {
    return this.wishlistService.isInWishlist(productId);
  }
}
