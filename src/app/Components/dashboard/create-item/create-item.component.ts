import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCreation } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item/item.service';
import { TokenService } from 'src/app/services/user/token.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router
  ) {}

  public email!: string;
  public itemForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.protectRoute();
    this.itemForm = this.createItemForm();
  }

  public createItemForm() {
    return this.fb.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required]],
    });
  }

  public createItem() {
    const item = {
      ...this.itemForm.value,
      userEmail: sessionStorage.getItem('email'),
    } as ItemCreation;

    if (!this.itemForm.valid) {
      return;
    }
    this.itemService.createItem(item).subscribe(() => {
      this.router.navigate(['dashboard'], {queryParamsHandling: 'preserve'})
    });
  }

  public protectRoute() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.email = res['email'];
    });
    console.log(this.email);
    if (!this.email) {
      this.tokenService.deleteToken();
      this.router.navigate(['']);
    } else {
      sessionStorage.setItem('email', this.email);
    }
  }
}
