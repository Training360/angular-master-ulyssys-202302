import { Component, inject } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {

  movieService: MovieService = inject(MovieService);

  movieList$ = this.movieService.getAll();

  transformActive(actvie: boolean): string {
    return actvie ? 'active' : 'inactive';
  }

  fibonacciGenerator(num: number): number {
    num = Math.abs(num) > 33 ? 33 : Math.abs(num);
    if (num <= 1) return 1;

	  return this.fibonacciGenerator(num - 1) + this.fibonacciGenerator(num - 2);
  }

  onSave(): void {
    console.log('Save');
  }

}
