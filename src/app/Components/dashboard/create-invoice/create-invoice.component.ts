import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
})
export class CreateInvoiceComponent implements OnInit {
  public invoiceForm = new FormGroup({});
  public userInSession!: any;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this.createInvoiceForm();
    this.getSession();
  }

  public getSession() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.userInSession = res;
    });
  }

  public createInvoiceForm() {
    return this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  public createInvoice() {
    const userId = this.userInSession.id;
    const invoice = this.invoiceForm.value as Invoice;

    if (!this.invoiceForm.valid) {
      return;
    }
    this.invoiceService
      .createInvoice(userId.toString(), invoice)
      .subscribe(() => {
        this.router.navigate(['dashboard'], {
          queryParamsHandling: 'preserve',
        });
      });
  }

  public cancelRedirect() {
    this.router.navigate(['dashboard'], { queryParamsHandling: 'preserve' });
  }
}
