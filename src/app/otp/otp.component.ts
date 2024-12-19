import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  regexNumber = new RegExp(`^[0-9]+$`);
  otpForm!: FormGroup;
  
  constructor(private activedRouter: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    this.otpForm = new FormGroup({
      otp: new FormControl('', [
        Validators.required, 
        Validators.maxLength(4),
        Validators.minLength(4),
        Validators.pattern(this.regexNumber)
      ]),
    })
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.otpForm.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required.';
    }

    if (control?.hasError('pattern')) {
      return 'OTP must contain only numeric characters.';
    }

    return null;
  }

  onSubmit() {
    if (this.otpForm.invalid) {
      //console.log(this.registerForm.value);
      this.otpForm.markAllAsTouched(); // Highlight all invalid fields
    } else {
      console.log('OTP Submitted', this.otpForm.value);
      this.router.navigate([`../`, `login`], {
        relativeTo: this.activedRouter,
        state: { fromStep: 'register' }
      })
    }
  }

}
