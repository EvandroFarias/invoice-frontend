import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
import { ItemCreation, ItemView } from 'src/app/models/Item';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { ItemService } from 'src/app/services/item/item.service';
import { TokenService } from 'src/app/services/user/token.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit {
  public userInSession!: any;
  public invoice!: Invoice;
  public loading = false;

  public emptyFormControl = new UntypedFormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private invoiceService: InvoiceService,
    private itemService: ItemService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSession();
    this.protectRoute();
    this.getInvoice();
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

  public getInvoice() {
    this.activatedRoute.params.subscribe((res) => {
      const invoiceId: string = res['id'];
      this.invoiceService.getInvoice(invoiceId).subscribe({
        next: (res) => {
          this.invoice = res as Invoice;
          this.loading = true;
        },
        error: (e) => {
          console.log(e);
        },
      });
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
        this.redirectToDashboard()
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  public addItemToInvoice(name: any, value: any) {
    this.activatedRoute.params.subscribe((res) => {
      const id = res['id'];
      const item = new ItemCreation(id, name, value);

      if (!item.name || !item.value) {
        this._snackBar.open(`Nome ou valor do item n??o preenchidos`, '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: [
            'd-flex',
            'text-danger',
            'bg-white',
            'justify-content-center',
          ],
        });
      } else {
        this.itemService.createItem(item).subscribe((res) => {
          console.log(res);
          window.location.reload();
        });
      }
    });
  }

  public deleteItemFromInvoice(item: ItemView) {
    this.itemService.deleteItem(item).subscribe({
      next: (res) => {
        this._snackBar.open(`Item deletado`, '', {
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
        window.location.reload();
      },
      error: (e) => {
        this._snackBar.open(`Error`, '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: [
            'd-flex',
            'text-danger',
            'bg-white',
            'justify-content-center',
          ],
        });
      },
    });
  }

  public redirectToDashboard() {
    this.router.navigate(['dashboard'], { queryParamsHandling: 'preserve' });
  }
}
