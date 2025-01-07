import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NoItemsComponent } from 'src/app/components/no-items/no-items.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoaderComponent,
    NoItemsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    NoItemsComponent
  ],
  providers: []
})
export class SharedModuleSharedModule { }
