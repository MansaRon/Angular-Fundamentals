import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductShopRoutingModule } from './product-shop-routing.module';
import { ProductShopComponent } from './product-shop.component';


@NgModule({
  declarations: [
    ProductShopComponent
  ],
  imports: [
    CommonModule,
    ProductShopRoutingModule
  ]
})
export class ProductShopModule { }
