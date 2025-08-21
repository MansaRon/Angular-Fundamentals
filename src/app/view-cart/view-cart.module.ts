import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCartRoutingModule } from './view-cart-routing.module';
import { ViewCartComponent } from './view-cart.component';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModuleSharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [ViewCartComponent],
  imports: [CommonModule, ViewCartRoutingModule, HttpClientModule, SharedModuleSharedModule],
  providers: [EcommerceserviceService],
})
export class ViewCartModule {}
