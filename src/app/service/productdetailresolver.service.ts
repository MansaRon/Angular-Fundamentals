import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../model/productInterface';
import { EcommerceserviceService } from './ecommerceservice.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductdetailResolverService implements Resolve<Product[] | null> {
  constructor(private productService: EcommerceserviceService) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<Product[] | null> {
    return this.productService.getProducts().pipe(
      catchError((error) => {
        console.error(`Failed to load product service`, error);
        return of(null);
      }),
    );
  }
}
