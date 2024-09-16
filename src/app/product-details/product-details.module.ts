import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { PurchaseModalComponent } from '../components/purchase-modal/purchase-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { ViewCartComponent } from '../components/view-cart/view-cart.component';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    PurchaseModalComponent,
    ViewCartComponent
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    HttpClientModule
  ],
  providers: [
    EcommerceserviceService
  ]
})
export class ProductDetailsModule { }
