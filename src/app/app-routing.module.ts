import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolverService } from './service/productresolver.service';
import { ProductdetailResolverService } from './service/productdetailresolver.service';
import { AuthguardGuard } from './guards/authguard.guard';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/product-details', 
    pathMatch: 'full' 
  },
  { 
    path: 'product-details', 
    loadChildren: () => import('./product-details/product-details.module')
    .then(m => m.ProductDetailsModule),
    resolve: { details: ProductdetailResolverService } 
  }, 
  { 
    path: 'product-shop/:productId', 
    loadChildren: () => import('./product-shop/product-shop.module')
    .then(m => m.ProductShopModule),
    resolve: { product: ProductResolverService }, 
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
    .then(m => m.CheckoutPageModule),
    canActivate: [AuthguardGuard]
  },
  { 
    path: 'thank-you', 
    loadChildren: () => import('./thank-you/thank-you.module')
    .then(m => m.ThankYouModule),
    canActivate: [AuthguardGuard]
  },
  { 
    path: 'register', 
    loadChildren: () => import('./register/register.module')
    .then(m => m.RegisterModule) 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module')
    .then(m => m.LoginModule) 
  },
  {
    path: 'otp',
    component: OtpComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
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
