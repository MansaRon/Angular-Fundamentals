import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolverService } from './service/productresolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/product-details', pathMatch: 'full' },
  { 
    path: 'product-details', 
    loadChildren: () => import('./product-details/product-details.module')
    .then(m => m.ProductDetailsModule) 
  }, 
  { 
    resolve: { product: ProductResolverService }, 
    path: 'product-shop/:productId', 
    loadChildren: () => import('./product-shop/product-shop.module')
    .then(m => m.ProductShopModule),
  },
  { 
    path: 'home', 
    loadChildren: () => import('./landing-page/landing-page.module')
    .then(m => m.LandingPageModule) 
  },
  { 
    path: 'view-cart', 
    loadChildren: () => import('./view-cart/view-cart.module')
    .then(m => m.ViewCartModule) 
  },
  { 
    path: 'checkout', 
    loadChildren: () => import('./checkout-page/checkout-page.module')
    .then(m => m.CheckoutPageModule) 
  },
  { 
    path: '**', 
    loadChildren: () => import('./page-not-found/page-not-found.module')
    .then(m => m.PageNotFoundModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
