import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MovieComponent } from './page/movie/movie.component';
import { PrimeTableComponent } from './page/prime-table/prime-table.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movie', component: MovieComponent},
  {path: 'prime-table', component: PrimeTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
