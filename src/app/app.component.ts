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

  public userInSession!: any;

  ngOnInit(): void {
    this.getSession()
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  public getSession() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.userInSession = res;
    });
  }

  public logout() {
    this.userService.signOff();
    this.router.navigate(['']);
    this._snackBar.open('Logged out !', '', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['text-success', 'bg-white'],
    });
  }
}
