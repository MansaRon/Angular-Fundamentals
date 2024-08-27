import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/product-details', pathMatch: 'full' },
  // Wildcard route for a 404 page
  // { path: '**', component: PageNotFoundComponent },
  { path: 'product-details', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) }, 
  { path: 'product-shop/:productId', loadChildren: () => import('./product-shop/product-shop.module').then(m => m.ProductShopModule) },
  { path: 'home', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
