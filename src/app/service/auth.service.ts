import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'isLogged';
  private readonly _isLogged$ = new BehaviorSubject<boolean>(
    localStorage.getItem('isLogged') === 'true',
  );
  readonly isLogged$ = this._isLogged$.asObservable();

  constructor(private router: Router) {}

  login() {
    localStorage.setItem(this.STORAGE_KEY, 'true');
    this._isLogged$.next(true);
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this._isLogged$.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this._isLogged$.value;
  }
}
