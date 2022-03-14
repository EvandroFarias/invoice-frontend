import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

import { TokenService } from 'src/app/services/user/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public userInSession!: any;
  public invoices!: Invoice[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.getSession();
    this.protectRoute();
    this.getInvoices();
  }

  public getSession() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.userInSession = res;
    });
  }

  public protectRoute() {
    if (!this.userInSession.email) {
      this.tokenService.deleteToken();
      this.router.navigate(['']);
    } else {
      sessionStorage.setItem('email', this.userInSession.email);
    }
  }

  public getInvoices() {
    if (!this.userInSession.id) {
      return;
    }

    this.invoiceService.getInvoice(this.userInSession.id).subscribe((res) => {
      this.invoices = res as Invoice[];
    });
  }

  public redirectToCreate() {
    this.router.navigate(['dashboard/createinvoice'], {
      queryParamsHandling: 'preserve',
    });
  }
}
