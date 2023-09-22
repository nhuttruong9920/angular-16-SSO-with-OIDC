import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log(this.claims);
  }
  
  get claims() {
    return this.authService.getClaims();
  }

  logout() {
    this.authService.logout();
  }
}
