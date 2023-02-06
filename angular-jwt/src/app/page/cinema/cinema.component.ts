import { Component, inject } from '@angular/core';
import { CinemaService } from 'src/app/service/ciname.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent {

  cinemaService: CinemaService = inject(CinemaService);

  list$ = this.cinemaService.getCinemas();

}
