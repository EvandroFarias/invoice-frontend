import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/Invoice';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public createInvoice(userId: string, invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(
      `${API}/invoice/${userId}`,
      invoice,
      this.httpOptions
    );
  }

  public getInvoice(userId: string){
    return this.http.get(`${API}/invoice/${userId}`)
  }
}
