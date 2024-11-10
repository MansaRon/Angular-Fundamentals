import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { EcommerceserviceService } from 'src/app/service/ecommerceservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductResolverService } from 'src/app/service/productresolver.service';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: []
})
export class SharedModule { }
