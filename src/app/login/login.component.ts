import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  loginForm!: FormGroup;
  private returnUrl: string | null = null;
  private forwardState: Record<string, unknown> | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // check if user is coming from checkout page or not
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    // capture return url and any forwarded state (e.g., checkout form values)
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.returnUrl = params.get('returnUrl');
    });
    const nav = this.router.getCurrentNavigation();
    const stateFromNav = nav?.extras?.state as Record<string, unknown> | undefined;
    const stateFromHistory = (history.state as Record<string, unknown>) || undefined;
    this.forwardState = stateFromNav ?? stateFromHistory ?? null;
  }

  isUserLoggedIn() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.isLogin = params['isLogin'] === 'true';
    });
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
    // check if user was redirected from checkout page or logging in for 1st time
    console.log(this.loginForm.value);
    this.authService.login();
    const target = this.returnUrl || '/product-details';
    this.router.navigate([target], {
      state: this.forwardState || undefined,
    });
  }
}
