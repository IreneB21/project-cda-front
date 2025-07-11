import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userId = sessionStorage.getItem('userId');

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
