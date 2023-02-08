import { Component, inject, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { ConfigService } from 'src/app/service/config.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'angular-optimization';

  movieService: MovieService = inject(MovieService);

  movieList: Movie[] = [];

  config: ConfigService = inject(ConfigService);

  cols = this.config.movieTableColumns;

  ngOnInit(): void {
    this.movieService.getAll().subscribe(
      list => this.movieList = list
    );
  }
}
