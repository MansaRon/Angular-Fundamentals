import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { PurchaseModalComponent } from '../components/purchase-modal/purchase-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { ViewCartComponent } from '../components/view-cart-modal/view-cart.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { SearchPipePipe } from '../pipes/search-pipe.pipe';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    PurchaseModalComponent,
    ViewCartComponent,
    SearchBarComponent,
    NavigationBarComponent,
    SearchPipePipe
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    EcommerceserviceService
  ]
})
export class ProductDetailsModule { }
