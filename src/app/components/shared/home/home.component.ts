import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RightSectionComponent } from './right-section/right-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RightSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
