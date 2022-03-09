import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});
  public dontMatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
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
        next: () => {
          this._snackBar.open(`Logged in`, '', {
            duration: 2500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['text-success', 'bg-white'],
          });
          const passUser = {
            id: user.id,
            email: user.email,
          };
          this.router.navigate(['dashboard'], { state: { passUser } });
        },
        error: () => {
          this.dontMatch = true;
          this._snackBar.open('Email or password are incorrect', 'close', {
            duration: 2500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['text-danger', 'bg-white'],
          });
        },
        complete: () => {},
      });
    }
  }

  public redirect() {
    this.router.navigate(['']);
  }
}
