import { Injectable } from '@angular/core';

const KEY = 'x-access-token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public getToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  public storeToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  public deleteToken() {
    localStorage.removeItem(KEY);
  }

  public hasToken() {
    return !!this.getToken();
  }
}
