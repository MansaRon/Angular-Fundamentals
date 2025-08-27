import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModuleSharedModule } from './shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CartStore } from './store/cart.store';
import { WishlistStore } from './store/wishlist.store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModuleSharedModule, ReactiveFormsModule],
  providers: [CartStore, WishlistStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
