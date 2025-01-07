import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutPageRoutingModule } from './checkout-page-routing.module';
import { CheckoutPageComponent } from './checkout-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModuleSharedModule } from '../shared/shared/shared.module';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { AuthguardGuard } from '../guards/authguard.guard';


@NgModule({
  declarations: [
    CheckoutPageComponent
  ],
  imports: [
    CommonModule,
    CheckoutPageRoutingModule,
    ReactiveFormsModule,
    SharedModuleSharedModule
  ], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true
    },
    AuthguardGuard
  ]
})
export class CheckoutPageModule { }
