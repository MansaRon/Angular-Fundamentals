import { ResolveFn } from "@angular/router";
import { Product } from "../model/productInterface";
import { inject } from "@angular/core";
import { EcommerceserviceService } from "./ecommerceservice.service";
import { catchError, of } from "rxjs";

export const ProductResolverService: ResolveFn<Product | null> = (route, state) => {
  const productService = inject(EcommerceserviceService);
  const productId = Number(route.paramMap.get('id'));

  return productService.getSingleProduct(productId).pipe(
    catchError((error) => {
      console.log(`Can't load products`, error);
      return of(null);
    })
  )
}
