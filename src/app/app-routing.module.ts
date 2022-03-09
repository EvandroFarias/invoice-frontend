import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';
////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { HomepageComponent } from './Components/homepage/homepage/homepage.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegisterComponent } from './Components/user/register/register.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
