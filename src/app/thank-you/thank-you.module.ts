import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankYouRoutingModule } from './thank-you-routing.module';
import { ThankYouComponent } from './thank-you.component';
import { AuthguardGuard } from '../guards/authguard.guard';


@NgModule({
  declarations: [
    ThankYouComponent
  ],
  imports: [
    CommonModule,
    ThankYouRoutingModule
  ],
  providers: [
    AuthguardGuard
  ]
})
export class ThankYouModule { }
