import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MovieEditorComponent } from './page/movie-editor/movie-editor.component';
import { MovieComponent } from './page/movie/movie.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movie',
    component: MovieComponent,
  },
  {
    path: 'movie/edit/:id',
    component: MovieEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
