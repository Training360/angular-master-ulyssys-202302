import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http: HttpClient = inject(HttpClient);

  endpoint: string = 'https://nettuts.hu/jms/joe/movies/';

  constructor() { }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.endpoint);
  }


}
