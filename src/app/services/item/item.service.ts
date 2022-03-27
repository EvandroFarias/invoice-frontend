import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCreation } from 'src/app/models/Item';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public createItem(item: ItemCreation) {
    return this.http.post(
      `${API}/item/${item.invoiceId}`,
      { name: item.name, value: item.value },
      this.httpOptions
    );
  }
}
