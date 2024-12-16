import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutPageRoutingModule } from './checkout-page-routing.module';
import { CheckoutPageComponent } from './checkout-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared/shared.module';
import { AuthInterceptor } from '../interceptor/auth.interceptor';


@NgModule({
  declarations: [
    CheckoutPageComponent
  ],
  imports: [
    CommonModule,
    CheckoutPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ], providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true
    }
  ]
})
export class CheckoutPageModule { }
