import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductShopComponent } from './product-shop.component';

const routes: Routes = [{ path: '', component: ProductShopComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductShopRoutingModule { }
