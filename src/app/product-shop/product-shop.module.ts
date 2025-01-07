import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductShopRoutingModule } from './product-shop-routing.module';
import { ProductShopComponent } from './product-shop.component';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModuleSharedModule } from '../shared/shared/shared.module';


@NgModule({
  declarations: [
    ProductShopComponent
  ],
  imports: [
    CommonModule,
    ProductShopRoutingModule,
    SharedModuleSharedModule
  ],
  providers: []
})
export class ProductShopModule { }
