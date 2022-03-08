import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createUser(form: User): Observable<User> {
    return this.http.post<User>(
      `${API}/register`,
      JSON.stringify(form),
      this.httpOptions
    );
  }

  checkEmail(email: string){
    return this.http.get(`${API}/user/exists/${email}`)
  }
}
