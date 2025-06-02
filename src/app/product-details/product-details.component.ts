import { Component, OnInit } from '@angular/core';
import { Product } from '../model/productInterface';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  showModal: boolean = false;
  selectedProduct!: Product;
  loader = false;
  productsInCart?: Product[] = [];
  isCartModalOpen = false; 
  filterText: string = '';
  products$!: Observable<Product[]>;
  private sort$ = new BehaviorSubject<string>('price-asc');

  constructor(
    private ecommerce: EcommerceserviceService) {}
  
  ngOnInit(): void {
    const rawProducts$ = this.ecommerce.getProducts();
    this.products$ = combineLatest([rawProducts$, this.sort$])
    .pipe(
      map(([products, sortType]) => this.ecommerce.sortProducts(products, sortType)),
      tap(() => (this.loader = true))
    );
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      this.productsInCart = JSON.parse(storedCart) as Product[];
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  openViewCart() {
    this.isCartModalOpen = true;
  }

  viewCartModel() {
    this.isCartModalOpen = !this.isCartModalOpen;
  }

  onSearchTextChanged(searchText: string) {
    this.filterText = searchText;
  }

  onSortSelected(sortString: string) {
    this.sort$.next(sortString);
  }
}
