import { Component, OnInit } from '@angular/core';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Country, COUNTRY_FLAGS } from '../model/country';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PAYMENT_OPTIONS, PaymentMethod } from '../model/paymentOptions';
import { DELIVERY_OPTIONS, DeliveryMethod } from '../model/deliveryOptions';
import { format } from '../model/numberFormat';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  payments: PaymentMethod[] = PAYMENT_OPTIONS;
  delivery: DeliveryMethod[] = DELIVERY_OPTIONS;
  countries: Country[] = COUNTRY_FLAGS;
  countryFlag: Country[] = COUNTRY_FLAGS;
  cities: string[] = [];
  selectedPaymentPrice: number = 15;

  checkoutForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    country: new FormControl<Country | null>(null, Validators.required),
    city: new FormControl('', Validators.required),
    paymentOption: new FormControl(
      this.payments.find((check) => check.checked)?.id || null,
      Validators.required,
    ),
    deliveryOption: new FormControl(
      this.delivery.find((delivery) => delivery.id)?.id || null,
      Validators.required,
    ),
    deliveryAmount: new FormControl(this.selectedPaymentPrice),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    emailAddress: new FormControl('', [Validators.email, Validators.required]),
    subTotal: new FormControl(0),
    promotionalCode: new FormControl('', Validators.maxLength(6)),
    tax: new FormControl(0),
    total: new FormControl(0),
  });

  selectedCountryCode = this.countryFlag[0].code;
  isDropdownOpen = false;
  selectedCountryFlag = this.countryFlag[0].svg;

  constructor(
    private ecommerce: EcommerceserviceService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getCountries();

    this.checkoutForm.get('deliveryOption')?.valueChanges.subscribe((selectedId) => {
      const selectedDelivery = this.delivery.find((option) => option.id === selectedId);
      if (selectedDelivery) {
        this.selectedPaymentPrice = selectedDelivery.price;
        this.checkoutForm.patchValue({ deliveryAmount: format(selectedDelivery.price) });
      }
    });
  }

  getCountries() {
    this.checkoutForm.get('country')?.valueChanges.subscribe((selectedCountry) => {
      if (selectedCountry) {
        this.cities = selectedCountry?.cities;
        this.checkoutForm.get('city')?.setValue('');
        this.selectedCountryCode = selectedCountry?.code;
        this.checkoutForm.get('phoneNumber')?.setValue('');
        this.selectedCountryFlag = selectedCountry?.svg;
      }
    });
  }

  changeCountryCode(code: string) {
    const selectedCountryCode =
      this.countryFlag.find((country) => country.code === code) || this.countryFlag[0];
    if (selectedCountryCode) {
      this.selectedCountryCode = selectedCountryCode.code;
    } else {
      this.selectedCountryCode = this.countryFlag[0].code;
    }
  }

  getSafeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  onPaymentMethodChange(id: string) {
    this.checkoutForm.patchValue({ paymentOption: id });
  }

  onDeliveryChange(id: string) {
    this.checkoutForm.patchValue({ deliveryOption: id });
  }

  getPromo(): Observable<number> {
    return this.ecommerce.getPromotionalDiscount().pipe(map((discount) => discount));
  }

  getCartSubTotal(): Observable<number> {
    return combineLatest([this.ecommerce.getCartTotal(), this.getPromo()]).pipe(
      map(([total, discount]) => total - discount),
      tap((subTotal) => this.checkoutForm.patchValue({ subTotal: format(subTotal) })),
    );
  }

  getTaxAmount(): Observable<number> {
    return this.getCartSubTotal().pipe(
      map((subTotal) => subTotal * 0.1),
      tap((tax) => this.checkoutForm.patchValue({ tax: format(tax) })),
    );
  }

  getCartTotal(): Observable<number> {
    return this.getCartSubTotal().pipe(map((subTotal) => subTotal + this.selectedPaymentPrice));
  }

  getTotalWithTax(): Observable<number> {
    return combineLatest([this.getCartTotal(), this.getTaxAmount()]).pipe(
      map(([total, tax]) => total + tax),
      tap((totalWithTax) => this.checkoutForm.patchValue({ total: format(totalWithTax) })),
    );
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      window.scroll({ top: 0, behavior: 'smooth' });
      return;
    }

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/thank-you']).then(() => {
        this.checkoutForm.reset();
      });
      return;
    }

    const returnUrl = '/checkout';
    const checkoutState = this.checkoutForm.getRawValue();
    this.ecommerce.clearCart();
    this.router.navigate(['/login'], {
      queryParams: { returnUrl },
      state: { from: 'checkout', checkoutState },
    });
  }
}
