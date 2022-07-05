import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  public loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private invoiceService: InvoiceService,
    private _snackBar: MatSnackBar
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

    this.invoiceService.getInvoices(this.userInSession.id).subscribe({
      next: (res) => {
        this.invoices = res as Invoice[];
        this.loading = true;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  public redirectToCreate() {
    this.router.navigate(['dashboard/createinvoice'], {
      queryParamsHandling: 'preserve',
    });
  }

  public redirectToInvoicePage(invoice: Invoice) {
    console.log(invoice.items);
    const id = invoice.id;
    this.router.navigate([`dashboard/invoice/${id}`], {
      queryParamsHandling: 'merge',
      state: invoice,
    });
  }

  public deleteInvoice(invoice: Invoice) {
    this.invoiceService.deleteInvoice(invoice).subscribe({
      next: (res) => {
        this._snackBar.open(`Invoice deletado`, '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: [
            'd-flex',
            'text-success',
            'bg-white',
            'justify-content-center',
          ],
        });
        window.location.reload()
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
