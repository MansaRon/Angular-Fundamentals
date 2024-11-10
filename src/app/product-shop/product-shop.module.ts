import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductShopRoutingModule } from './product-shop-routing.module';
import { ProductShopComponent } from './product-shop.component';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProductShopComponent
  ],
  imports: [
    CommonModule,
    ProductShopRoutingModule,
    HttpClientModule
  ],
  providers: []
})
export class ProductShopModule { }
