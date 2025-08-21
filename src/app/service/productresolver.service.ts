import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../model/productInterface';
import { Injectable } from '@angular/core';
import { EcommerceserviceService } from './ecommerceservice.service';
import { catchError, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductResolverService implements Resolve<Product | null> {
  constructor(private productService: EcommerceserviceService) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Product | null> {
    const productId = Number(_route.paramMap.get('productId'));
    return this.productService.getSingleProduct(productId).pipe(
      catchError((error) => {
        console.error(`Failed to load product with id: ${productId}`, error);
        return of(null);
      }),
    );
  }
}
