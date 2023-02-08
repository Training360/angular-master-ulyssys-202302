import { Component, inject } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-prime-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss']
})
export class PrimeTableComponent {

  movieService: MovieService = inject(MovieService);

  list$ = this.movieService.getAll();

}
