import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  isRegistered: boolean = false;
  registerForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    })
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

}
