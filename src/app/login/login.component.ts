import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLogin: boolean = false;
  loginForm!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    
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
   
    return null;
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

}
