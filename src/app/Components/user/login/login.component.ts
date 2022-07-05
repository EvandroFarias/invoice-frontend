import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLogin, UserRegistration } from 'src/app/models/User';
import { ExistsService } from 'src/app/services/user/exists.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup = new UntypedFormGroup({});
  public dontMatch: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  public createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public login() {
    if (!this.loginForm.valid) {
      return;
    } else {
      const user = this.loginForm.value as UserLogin;

      this.userService.signIn(user).subscribe({
        next: (res: any) => {
          this._snackBar.open(`Logged in`, '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['text-success', 'bg-white'],
          });

          const payload = res.body.payload;

          delete payload.password;
          delete payload.createdAt;
          delete payload.updatedAt;

          this.router.navigate(['dashboard'], { queryParams: payload });
        },
        error: (err: any) => {
          this.dontMatch = true;
          this._snackBar.open('Email or password are incorrect', 'close', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['text-danger', 'bg-white'],
          });
        },
        complete: () => {},
      });
    }
  }

  public redirectToRegister() {
    this.router.navigate(['signup']);
  }

  public redirect() {
    this.router.navigate(['']);
  }
}
