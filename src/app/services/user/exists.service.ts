import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ExistsService {
  constructor(private service: UserService) {}

  public emailAlreadyExists() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((userEmail) => this.service.checkEmail(userEmail)),
        map((emailExists) => (emailExists ? { emailExists: true } : null)),
        first()
      );
    };
  }
}
