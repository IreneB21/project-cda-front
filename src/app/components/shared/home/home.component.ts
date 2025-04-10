import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RightSectionComponent } from './right-section/right-section.component';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RightSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private homeService = inject(HomeService);

  posts: Array<any> = [];
  lastEvents: Array<any> = [];

  ngOnInit(): void {

  }
}
