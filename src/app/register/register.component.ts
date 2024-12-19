import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  isRegistered: boolean = false;
  registerForm!: FormGroup;
  regexName = new RegExp(`^[a-zA-Z0-9 :,/'?.+()-]*$`);
  regexPassword = new RegExp(`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,15}$/`);
  regexNumber = new RegExp(`^[0-9]+$`);
  constructor(private activedRouter: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required, 
        Validators.pattern(this.regexName)
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.regexNumber)
      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(15),
        //Validators.pattern(this.regexPassword)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        //Validators.pattern(this.regexPassword)
      ])
    }, {
      validators: this.passwordConfirming,
    })
  }

  passwordConfirming: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    console.log('inside here');
    
    return password === confirmPassword
    ? null
    : { passwordsMismatch: true };
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    //console.log(control);
    
    if (control?.hasError('required')) {
      return 'This field is required.';
    }
  
    if (control?.hasError('pattern')) {
      if (controlName === 'name') {
        return 'Name must contain only valid characters.';
      } 
      else if (controlName === 'phoneNumber') {
        return 'Phone number must contain only numeric characters.';
      }
      else if (controlName === 'password' || controlName === 'confirmPassword') {
        return 'Password must meet complexity requirements.';
      }
    }
  
    if (control?.hasError('email')) {
      return 'Enter a valid email address.';
    }
  
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength}.`;
    }
  
    if (control?.hasError('maxlength')) {
      return `Maximum length is ${control.errors?.['maxlength'].requiredLength}.`;
    }
    //console.log(controlName);
    
    if (controlName === 'confirmPassword' && this.registerForm.hasError('passwordsMismatch')) {
      return 'Passwords do not match.';
    }    
  
    return null; // No errors
  }
  
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.registerForm.valueChanges.subscribe((response: any) => console.log(response));
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      //console.log(this.registerForm.value);
      this.registerForm.markAllAsTouched(); // Highlight all invalid fields
    } else {
      console.log('Form Submitted', this.registerForm.value);
      this.router.navigate([`../`, `login`], {
        relativeTo: this.activedRouter,
        state: { fromStep: 'register' }
      })
    }
  }

}
