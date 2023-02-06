import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Cinema } from '../model/cinema';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  http: HttpClient = inject(HttpClient);

  apiUrl: string = environment.apiUrl;

  constructor() { }

  // Get all cinemas
  getCinemas(): Observable<Cinema[]>{
    return this.http.get<Cinema[]>(`${this.apiUrl}cinemas`);
  }

  // Get single cinema by ID
  getCinema(id: number) {
    return this.http.get(`${this.apiUrl}cinemas/${id}`);
  }

  // Add cinema
  addCinema(cinema: Cinema) {
    return this.http.post(`${this.apiUrl}cinemas`, cinema);
  }

  // Update cinema
  updateCinema(id: number, cinema: Cinema) {
    return this.http.put(`${this.apiUrl}cinemas/${id}`, cinema);
  }

  // Delete cinema
  deleteCinema(id: number) {
    return this.http.delete(`${this.apiUrl}cinemas/${id}`);
  }
}
