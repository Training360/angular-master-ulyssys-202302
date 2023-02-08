import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { getAllMovies } from 'src/app/store/movie/MovieActions';
import { selectMovies } from 'src/app/store/movie/MovieReducer';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  store: Store = inject(Store);

  list$ = this.store.select(selectMovies);

  ngOnInit(): void {
    this.store.dispatch(getAllMovies());
  }

}
