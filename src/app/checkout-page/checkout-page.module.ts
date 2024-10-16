import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutPageRoutingModule } from './checkout-page-routing.module';
import { CheckoutPageComponent } from './checkout-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EcommerceserviceService } from '../service/ecommerceservice.service';


@NgModule({
  declarations: [
    CheckoutPageComponent
  ],
  imports: [
    CommonModule,
    CheckoutPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    EcommerceserviceService
  ]
})
export class CheckoutPageModule { }
