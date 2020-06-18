import { Component } from '@angular/core';
import {User} from './_models';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  home() {
    if (this.currentUser && this.currentUser.token) {
      //w currentUser powinna znalesc sie rola i na jej podstawie przekierowac do doctor badz pateint dashboard.
      this.router.navigate(['/doctordashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
