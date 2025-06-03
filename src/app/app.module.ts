import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModuleSharedModule } from './shared/shared/shared.module';
import { OtpComponent } from './otp/otp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartStore } from './store/cart.store';
import { WishlistStore } from './store/wishlist.store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleSharedModule,
    ReactiveFormsModule
  ],
  providers: [
    CartStore,
    WishlistStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
