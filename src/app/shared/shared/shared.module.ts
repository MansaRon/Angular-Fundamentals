import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { EcommerceserviceService } from 'src/app/service/ecommerceservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductResolverService } from 'src/app/service/productresolver.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: []
})
export class SharedModule { }
