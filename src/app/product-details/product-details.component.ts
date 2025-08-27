import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../model/productInterface';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { WishlistService } from '../service/wishlist.service';
import { BehaviorSubject, combineLatest, map, Observable, Subject, takeUntil, take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  selectedProduct!: Product;
  isCartModalOpen = false;
  filterText: string = '';
  products$!: Observable<Product[]>;
  productsInCart$: Observable<Product[]>;
  private sort$ = new BehaviorSubject<string>('price-asc');
  private destroy$ = new Subject<void>();

  constructor(
    private ecommerce: EcommerceserviceService,
    private wishlistService: WishlistService,
  ) {
    this.productsInCart$ = this.ecommerce.getCartItems();
  }

  ngOnInit(): void {
    const rawProducts$ = this.ecommerce.getProducts();
    this.products$ = combineLatest([rawProducts$, this.sort$]).pipe(
      map(([products, sortType]) => this.ecommerce.sortProducts(products, sortType)),
      takeUntil(this.destroy$),
    );
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
    this.filterText = searchText;
  }

  onSortSelected(sortString: string): void {
    this.sort$.next(sortString);
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
