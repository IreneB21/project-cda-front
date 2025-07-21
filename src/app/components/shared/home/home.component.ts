import { Component, inject } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { FlowSectionComponent } from './main-section/flow-section/flow-section.component';
import { SideSectionComponent } from './main-section/side-section/side-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlowSectionComponent, SideSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: { 'class': 'bg-gray-100 flex flex-grow p-5 pt-3' }
})
export class HomeComponent {

  private homeService = inject(HomeService);

  posts: Array<any> = [];
  lastEvents: Array<any> = [];
}
