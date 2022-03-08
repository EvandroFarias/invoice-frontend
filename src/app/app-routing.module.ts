import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { HomepageComponent } from './Components/homepage/homepage/homepage.component';
import { RegisterComponent } from './Components/homepage/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
