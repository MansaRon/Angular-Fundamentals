import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCartRoutingModule } from './view-cart-routing.module';
import { ViewCartComponent } from './view-cart.component';


@NgModule({
  declarations: [
    ViewCartComponent
  ],
  imports: [
    CommonModule,
    ViewCartRoutingModule
  ]
})
export class ViewCartModule { }
