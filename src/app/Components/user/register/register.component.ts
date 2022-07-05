import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRegistration } from 'src/app/models/User';
import { ExistsService } from 'src/app/services/user/exists.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public registrationForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: UserService,
    private checkEmail: ExistsService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.createRegistrationForm();
  }

  public createRegistrationForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.minLength(10)],
        [this.checkEmail.emailAlreadyExists()],
      ],
      password: ['', [Validators.required]],
      verifyPassword: [''],
    });
  }

  public register() {
    if (!this.registrationForm.valid) {
      return;
    } else {
      const user = this.registrationForm.value as UserRegistration;
      delete user.verifyPassword;

      this.registerService.createUser(user).subscribe({
        next: (resp) => {},
        error: (err) => {},
      });
      this.router.navigate(['']);
    }
  }

  public redirect() {
    this.router.navigate(['']);
  }

  public redirectToLogin() {
    this.router.navigate(['signin']);
  }
}
