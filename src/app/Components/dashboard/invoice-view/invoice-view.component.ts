import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
import { ItemCreation } from 'src/app/models/Item';
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

  public emptyFormControl = new FormControl('', [Validators.required]);

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
      this.invoiceService.getInvoice(invoiceId).subscribe((res) => {
        this.invoice = res as Invoice;
      });
    });
  }

  public deleteInvoice() {
    console.log('Under construction');
  }

  public addItemToInvoice(name: any, value: any) {
    this.activatedRoute.params.subscribe((res) => {
      const id = res['id'];
      const item = new ItemCreation(id, name, value);

      if (!item.name || !item.value) {
        this._snackBar.open(`Nome ou valor do item não preenchidos`, '', {
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
        });
      }
    });
  }

  public deleteItemFromInvoice() {
    console.log('Under construction');
  }

  public redirectToDashboard() {
    this.router.navigate(['dashboard'], { queryParamsHandling: 'preserve' });
  }
}
