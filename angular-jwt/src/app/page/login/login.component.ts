import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, zip } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth: AuthService = inject(AuthService);

  http: HttpClient = inject(HttpClient);

  router: Router = inject(Router);

  loginData: User = new User();

  loginError: string = '';

  loginError$: Subject<string> = this.auth.loginErrorSubject;

  constructor() { }

  ngOnInit(): void {
    // this.auth.loginErrorSubject.subscribe(
    //   message => this.loginError = message,
    // )
  }

  login(): void {
    this.auth.login(this.loginData).subscribe(
      response => {
        if (response.user !== null) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  setPasswords(): void {
    zip([
      this.http.patch('http://localhost:3000/users/1', { email: 'cf@gmail.com', password: 'test' }),
      this.http.patch('http://localhost:3000/users/2', { password: 'test' }),
      this.http.patch('http://localhost:3000/users/3', { password: 'test' }),
    ]).subscribe({
      next: () => console.log('Users updated!'),
    });
  }

}
