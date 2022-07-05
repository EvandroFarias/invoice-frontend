import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'invoice-frontend';

  public loading = true;
  public userInSession!: any;

  ngOnInit(): void {
    this.getSession();
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  public getSession() {
    this.activatedRoute.queryParams.subscribe({
      next: (res) => {
        this.userInSession = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  public logout() {
    this.userService.signOff();
    this.router.navigate(['']);
    this._snackBar.open('Logged out !', '', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['text-success', 'bg-white'],
    });
  }

  public redirectToDashboard() {
    this.router.navigate(['dashboard'], { queryParamsHandling: 'preserve' });
  }

  public redirectToLogin() {
    this.router.navigate(['signin']);
  }

  public redirectToRegister() {
    this.router.navigate(['signup']);
  }

  public redirectToHome() {
    this.router.navigate(['']);
  }
}
