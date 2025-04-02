import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { InfosComponent } from './infos/infos.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, InfosComponent, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
