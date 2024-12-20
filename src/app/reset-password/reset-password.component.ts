import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  regexNumber = new RegExp(`^[0-9]+$`);
  resetPasswordForm!: FormGroup;

  constructor(private activedRouter: ActivatedRoute, private router: Router) {}
    
  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      currentPassword: new FormControl('', [
        Validators.required, 
        Validators.maxLength(15),
        Validators.minLength(6),
        //Validators.pattern(this.regexNumber)
      ]),
      newPassword: new FormControl('', [
        Validators.required, 
        Validators.maxLength(15),
        Validators.minLength(6),
        //Validators.pattern(this.regexNumber)
      ]),
    }, {
      validators: this.passwordConfirming,
    })
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.resetPasswordForm.get(controlName);
    //console.log(control);
    
    if (control?.hasError('required')) {
      return 'This field is required.';
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
    
    if (controlName === 'confirmPassword' && this.resetPasswordForm.hasError('passwordsMismatch')) {
      return 'Passwords do not match.';
    }    
  
    return null;
  }

    passwordConfirming: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      console.log('inside here');
      
      return password === confirmPassword
      ? null
      : { passwordsMismatch: true };
    }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      //console.log(this.registerForm.value);
      this.resetPasswordForm.markAllAsTouched(); // Highlight all invalid fields
    } else {
      console.log('Form Submitted', this.resetPasswordForm.value);
      this.router.navigate([`../`, `login`], {
        relativeTo: this.activedRouter,
        state: { fromStep: 'reset-password' }
      })
    }
  }

}
