import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Product } from '../model/productInterface';
import { Observable, map, switchMap, tap, catchError, of, combineLatest } from 'rxjs';
import { EcommerceserviceService } from '../service/ecommerceservice.service';

export interface ProductDetailsState {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  error?: string | null;
  sortType: string;
  filterText: string;
}

export const initialProductDetailsState: ProductDetailsState = {
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
  sortType: 'price-asc',
  filterText: '',
};

@Injectable()
export class ProductDetailsStore extends ComponentStore<ProductDetailsState> {
  constructor(private ecommerceService: EcommerceserviceService) {
    super(initialProductDetailsState);
  }

  // SELECTORS
  private readonly products$ = this.select((state) => state.products);
  private readonly isLoading$ = this.select((state) => state.isLoading);
  private readonly error$ = this.select((state) => state.error);
  private readonly sortType$ = this.select((state) => state.sortType);
  private readonly filterText$ = this.select((state) => state.filterText);
  private readonly filteredProducts$ = this.select((state) => state.filteredProducts);

  // VM (View Model) that combines the product details state
  vm$ = this.select({
    products: this.filteredProducts$,
    isLoading: this.isLoading$,
    error: this.error$,
    sortType: this.sortType$,
    filterText: this.filterText$,
  });

  // EFFECTS
  readonly loadProducts = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.ecommerceService.getProducts().pipe(
          tap((products) => {
            this.setProducts(products);
            this.applySortAndFilter();
          }),
          catchError((error) => {
            this.setError(error.message || 'Failed to load products');
            return of([]);
          }),
          tap(() => this.setLoading(false)),
        ),
      ),
    );
  });

  // UPDATERS
  readonly setLoading = this.updater<boolean>((state, isLoading) => ({ ...state, isLoading }));

  readonly setError = this.updater<string | null>((state, error) => ({
    ...state,
    error,
    isLoading: false,
  }));

  readonly setProducts = this.updater<Product[]>((state, products) => ({ ...state, products }));

  readonly setSortType = this.updater<string>((state, sortType) => ({ ...state, sortType }));

  readonly setFilterText = this.updater<string>((state, filterText) => ({ ...state, filterText }));

  readonly setFilteredProducts = this.updater<Product[]>((state, filteredProducts) => ({
    ...state,
    filteredProducts,
  }));

  private applySortAndFilter(): void {
    combineLatest([this.products$, this.sortType$, this.filterText$])
      .pipe(
        map(([products, sortType, filterText]: [Product[], string, string]) => {
          let filtered = products;

          if (filterText) {
            filtered = products.filter(
              (product: Product) =>
                product.title.toLowerCase().includes(filterText.toLowerCase()) ||
                product.description.toLowerCase().includes(filterText.toLowerCase()),
            );
          }

          return this.ecommerceService.sortProducts(filtered, sortType);
        }),
      )
      .subscribe((sortedAndFiltered) => {
        this.setFilteredProducts(sortedAndFiltered);
      });
  }

  updateSortType(sortType: string): void {
    this.setSortType(sortType);
    this.applySortAndFilter();
  }

  updateFilterText(filterText: string): void {
    this.setFilterText(filterText);
    this.applySortAndFilter();
  }

  initialize(): void {
    this.loadProducts();
  }
}
