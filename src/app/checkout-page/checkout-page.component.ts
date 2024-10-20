import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Country, COUNTRY_FLAGS } from '../model/country';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  countries: Country[] = COUNTRY_FLAGS;
  cities: string[] = [];
  checkoutForm = new FormGroup({    
    firstName: new FormControl('', Validators.required),    
    lastName: new FormControl('', Validators.required),
    country: new FormControl<Country | null>(null, Validators.required),
    city: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required, 
      Validators.maxLength(10), 
      Validators.minLength(10)
    ]),
    emailAddress: new FormControl('', [
      Validators.email, 
      Validators.required
    ])
  });
  countryFlag: Country[] = COUNTRY_FLAGS;
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
  }

  changeCountryCode(code: string) {
    const selectedCountryCode = this.countryFlag.find(country => country.code === code) || this.countryFlag[0];
    if (selectedCountryCode) {
      this.selectedCountryCode = selectedCountryCode.code;
    } else {
      this.selectedCountryCode = this.countryFlag[0].code;
    }
    console.log('here');
    
  }

  getSafeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

}
