import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    console.log(this.claims);
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get claims() {
    return this.authService.getClaims();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
