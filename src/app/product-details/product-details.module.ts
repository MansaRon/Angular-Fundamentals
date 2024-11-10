import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { PurchaseModalComponent } from '../components/purchase-modal/purchase-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { ViewCartComponent } from '../components/view-cart-modal/view-cart.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { SearchPipePipe } from '../pipes/search-pipe.pipe';
import { SortComponent } from '../components/sort/sort.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { SharedModule } from '../shared/shared/shared.module';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    PurchaseModalComponent,
    ViewCartComponent,
    SearchBarComponent,
    NavigationBarComponent,
    SearchPipePipe,
    SortComponent,
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: []
})
export class ProductDetailsModule { }
