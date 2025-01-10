import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NoItemsComponent } from 'src/app/components/no-items/no-items.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { OtpComponent } from 'src/app/otp/otp.component';
import { ResetPasswordComponent } from 'src/app/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoaderComponent,
    NoItemsComponent,
    OtpComponent,
    ResetPasswordComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    NoItemsComponent,
    OtpComponent,
    ResetPasswordComponent,
    FooterComponent
  ],
  providers: []
})
export class SharedModuleSharedModule { }
