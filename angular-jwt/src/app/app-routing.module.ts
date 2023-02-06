import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { RoleGuard } from './guard/role.guard';
import { CinemaComponent } from './page/cinema/cinema.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [
      LoginGuard,
      RoleGuard,
    ],
    data: {
      role: 1,
    },
  },
  {
    path: 'cinema',
    component: CinemaComponent,
    canActivate: [
      LoginGuard,
    ],
    data: {
      role: 1,
    }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
