import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = `${environment.apiUrl}login`;

  logoutUrl: string = `${environment.apiUrl}logout`;

  currentUserSubject: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null);

  loginErrorSubject: Subject<string> = new Subject();
  
  lastToken: string = '';

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  login(loginData: User): Observable<{user: User | null}> {
    return this.http.post<{accessToken: string, user: User}>(
      this.loginUrl,
      loginData,
    ).pipe(
      catchError( (error: HttpErrorResponse) => {
        this.loginErrorSubject.next('A megadott adatok helytelenek!');
        return of({accessToken: '', user: null});
      }),
      map( response => {
        if( response.accessToken && response.user ) {
          this.currentUserSubject.next(response.user);
          this.lastToken = response.accessToken;
          return { user: response.user };
        }

        this.currentUserSubject.next(null);
        this.lastToken = '';
        return { user: null };
      }),
    );
  }
}
