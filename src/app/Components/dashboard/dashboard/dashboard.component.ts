import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/user/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    console.log(history.state);
    
    this.tokenService.getToken();
  }
}
