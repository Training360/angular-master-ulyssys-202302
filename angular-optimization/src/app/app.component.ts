import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Movie } from './model/movie';
import { ConfigService } from './service/config.service';
import { MovieService } from './service/movie.service';
import { selectMovieError } from './store/movie/MovieReducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  store: Store = inject(Store);

  movieError$ = this.store.pipe( select(selectMovieError) );
  
}
