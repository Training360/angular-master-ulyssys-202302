import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  auth: AuthService = inject(AuthService);

  user$ = this.auth.currentUserSubject;

  router: Router = inject(Router);

  onLogout(): void {
    this.auth.logout();
  }

  checkLink(link: string): boolean {
    if (this.user$.value) {
      const role = this.router.config.find( c => c.path === link )?.data?.['role'];
      return Boolean(this.user$.value.role && this.user$.value.role >= role);
    }
    return false;
  }

}
