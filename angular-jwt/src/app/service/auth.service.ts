import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = `${environment.apiUrl}login`;

  logoutUrl: string = `${environment.apiUrl}logout`;

  currentUserSubject: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null);
  
  lastToken: string = '';

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  login(loginData: User): Observable<{accessToken: string}> {
    return this.http.post<{accessToken: string}>(
      this.loginUrl,
      loginData,
    );
  }
}
