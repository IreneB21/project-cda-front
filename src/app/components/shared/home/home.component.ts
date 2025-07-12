import { Component, inject, OnInit } from '@angular/core';
import { RightSectionComponent } from './main-section/right-section.component';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RightSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private homeService = inject(HomeService);

  posts: Array<any> = [];
  lastEvents: Array<any> = [];
}
