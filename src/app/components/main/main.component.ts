import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  host: { 'class':'flex flex-grow pl-0 lg:pl-56 pb-16 lg:pb-0' }
})
export class MainComponent {

}
