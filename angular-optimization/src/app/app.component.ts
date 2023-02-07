import { Component, inject, OnInit } from '@angular/core';
import { Movie } from './model/movie';
import { MovieService } from './service/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-optimization';

  movieService: MovieService = inject(MovieService);

  movieList: Movie[] = [];

  ngOnInit(): void {
    this.movieService.getAll().subscribe(
      list => this.movieList = list
    );
  }
}
