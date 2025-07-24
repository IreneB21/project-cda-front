import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, ButtonComponent, RouterLink],
  templateUrl: './landing.component.html',
  host: { 'class':'flex-grow flex flex-col' }
})
export class LandingComponent {
  label = "C'est parti !"
}
