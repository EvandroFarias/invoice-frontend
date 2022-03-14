import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { UserLogin, UserRegistration } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public createUser(form: UserRegistration): Observable<UserRegistration> {
    return this.http.post<UserRegistration>(
      `${API}/register`,
      JSON.stringify(form),
      this.httpOptions
    );
  }

  public checkEmail(email: string) {
    return this.http.get(`${API}/user/exists/${email}`);
  }

  public signIn(form: UserLogin): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(`${API}/login`, form, {
        observe: 'response',
        headers: this.httpOptions.headers,
      })
      .pipe(
        tap((res) => {
          const token = res.headers.get('x-access-token') ?? '';
          this.tokenService.storeToken(token);
        })
      );
  }

  public signOff() {
    sessionStorage.removeItem('email');
    localStorage.removeItem('x-access-token');
    this.tokenService.deleteToken();
  }

  public isLoggedIn() {
    return this.tokenService.hasToken();
  }
}
