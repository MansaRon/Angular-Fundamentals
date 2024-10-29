import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Country, COUNTRY_FLAGS } from '../model/country';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PAYMENT_OPTIONS, PaymentMethod } from '../model/paymentOptions';
import { DELIVERY_OPTIONS, DeliveryMethod } from '../model/deliveryOptions';
import { format } from '../model/numberFormat';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
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
    paymentOption: new FormControl(this.payments.find(check => check.checked)?.id || null, Validators.required),
    deliveryOption: new FormControl(this.delivery.find(delivery => delivery.id)?.id || null, Validators.required),
    deliveryAmount: new FormControl(this.selectedPaymentPrice),
    phoneNumber: new FormControl('', [
      Validators.required, 
      Validators.maxLength(10), 
      Validators.minLength(10)
    ]),
    emailAddress: new FormControl('', [
      Validators.email, 
      Validators.required
    ]),
    subTotal: new FormControl(0),
    promotionalCode: new FormControl('', Validators.maxLength(6)),
    tax: new FormControl(0),
    total: new FormControl(0)
  });
  
  selectedCountryCode = this.countryFlag[0].code;
  isDropdownOpen = false;
  selectedCountryFlag = this.countryFlag[0].svg;

  constructor(private activatedRoute: ActivatedRoute,
    private ecommerce: EcommerceserviceService,
    private router: Router,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.checkoutForm.get('country')?.valueChanges.subscribe((selectedCountry) => {
      if (selectedCountry) {
        this.cities = selectedCountry?.cities;
        this.checkoutForm.get('city')?.setValue('');
        this.selectedCountryCode = selectedCountry?.code;
        this.checkoutForm.get('phoneNumber')?.setValue('');
        this.selectedCountryFlag = selectedCountry?.svg;
      }
    });

    //value change of delivery options
    this.checkoutForm.get('deliveryOption')?.valueChanges.subscribe(selectedId => {
      const selectedDelivery = this.delivery.find(option => option.id === selectedId);
      if (selectedDelivery) {
        this.selectedPaymentPrice = selectedDelivery.price;
        this.checkoutForm.patchValue({deliveryAmount: format(selectedDelivery.price)});
      }
    });
  }

  changeCountryCode(code: string) {
    console.log(code);
    const selectedCountryCode = this.countryFlag.find(country => country.code === code) || this.countryFlag[0];
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

  applyPromo() {
    const promoControl = this.checkoutForm.get('promotionalCode');
    return promoControl?.valid && promoControl.value?.length === 6 ? 50 : 0;
  }

  getCartSubTotal(): number {
    const subTotal = this.ecommerce.getCartTotal() - this.applyPromo();
    this.checkoutForm.patchValue({ subTotal: format(subTotal) });
    return subTotal;
  }

  getTaxAmount(): number {
    const tax = this.getCartSubTotal() * 0.10; 
    this.checkoutForm.patchValue({ tax: format(tax) });
    return tax;
  }

  getCartTotal(): number {
    return this.getCartSubTotal() + this.selectedPaymentPrice;
  }

  getTotalWithTax(): number {
    const totalWithTax = this.getCartTotal() + this.getTaxAmount();
    this.checkoutForm.patchValue({ total: format(totalWithTax) });
    return totalWithTax;
  }

  onSubmit() {
    console.log(this.checkoutForm.value);
  }
}
