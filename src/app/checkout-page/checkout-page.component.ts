import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceserviceService } from '../service/ecommerceservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Country } from '../model/country';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  countries: Country[] = [
    { name: 'United States', abbrev: 'USA', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
    { name: 'Australia', abbrev: 'AS', cities: ['Sydney', 'Melbourne', 'Brisbane'] },
    { name: 'France', abbrev: 'FR', cities: ['Paris', 'Lyon', 'Marseille'] },
    { name: 'Spain', abbrev: 'ES', cities: ['Madrid', 'Barcelona', 'Valencia'] },
    { name: 'United Kingdom', abbrev: 'UK', cities: ['London', 'Manchester', 'Liverpool'] }
  ];
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

  constructor(private activatedRoute: ActivatedRoute,
    private ecommerce: EcommerceserviceService,
    private router: Router) {}

  ngOnInit(): void {
    this.checkoutForm.get('country')?.valueChanges.subscribe((selectedCountry) => {
      if (selectedCountry) {
        this.cities = selectedCountry?.cities;
        this.checkoutForm.get('city')?.setValue('');
      }
    });
  }

}
