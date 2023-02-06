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

  constructor() {
    if (sessionStorage['appUser']) {
      this.lastToken = sessionStorage.getItem('lastToken') ?? '';
      this.currentUserSubject.next( JSON.parse( sessionStorage.getItem('appUser') ?? '' ));
    }

    this.currentUserSubject.subscribe(
      userOrNull => {
        if (userOrNull !== null) {
          sessionStorage.setItem('lastToken', this.lastToken);
          sessionStorage.setItem('appUser', JSON.stringify(userOrNull));
        } else {
          sessionStorage.removeItem('lastToken');
          sessionStorage.removeItem('appUser');
        }
      }
    );
  }

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
          this.lastToken = response.accessToken;
          this.currentUserSubject.next(response.user);
          return { user: response.user };
        }

        this.lastToken = '';
        this.currentUserSubject.next(null);
        return { user: null };
      }),
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.lastToken = '';
  }
}
