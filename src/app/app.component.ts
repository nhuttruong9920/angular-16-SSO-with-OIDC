import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

  }

  ngAfterViewChecked() {
    localStorage.setItem('access_token', this.authService.accessToken);
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  login() {
    this.authService.login();
  }
}
