import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { PurchaseModalComponent } from '../components/purchase-modal/purchase-modal.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ViewCartComponent } from '../components/view-cart-modal/view-cart.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { SearchPipePipe } from '../pipes/search-pipe.pipe';
import { SortComponent } from '../components/sort/sort.component';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { ErrorInterceptor } from '../interceptor/error.interceptor';
import { SharedModuleSharedModule } from '../shared/shared/shared.module';
import { CoreInterceptor } from '../interceptor/core.interceptor';


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
    SharedModuleSharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: LoggingInterceptor, 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorInterceptor, 
      multi: true
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreInterceptor,
      multi: true
    }
  ]
})
export class ProductDetailsModule { }
