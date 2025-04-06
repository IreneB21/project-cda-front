import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, ButtonComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  label = "C'est parti !"

  functioncall(event: any) {
    console.log('functioncall', event);
  }
}
