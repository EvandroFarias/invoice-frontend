import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemView } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item/item.service';

import { TokenService } from 'src/app/services/user/token.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public email!: string;
  public userId!: string;
  public items!: ItemView[];

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private itemService: ItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getItems();

    this.protectRoute();
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

  public protectRoute() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.email = res['email'];
    });
    if (!this.email) {
      this.tokenService.deleteToken();
      this.router.navigate(['']);
    } else {
      sessionStorage.setItem('email', this.email);
    }
  }

  public getItems() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.userId = res['id'];
    });
    this.itemService.getItem(this.userId).subscribe((res) => {
      this.items = res as ItemView[];
    });
  }

  public redirect() {
    this.router.navigate(['dashboard/create'], {
      queryParamsHandling: 'preserve',
    });
  }
}
