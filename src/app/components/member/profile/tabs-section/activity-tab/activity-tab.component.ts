import { Component, inject, OnInit } from '@angular/core';

import { PostMakingFormComponent } from '../../../post-making-form/post-making-form.component';
import { PublicationCardComponent } from '../../../../shared/publication-card/publication-card.component';
import { HomeService } from '../../../../../services/home.service';
import { EventCardComponent } from '../../../../shared/event-card/event-card.component';

@Component({
  selector: 'app-activity-tab',
  standalone: true,
  imports: [PublicationCardComponent, PostMakingFormComponent, EventCardComponent],
  templateUrl: './activity-tab.component.html',
  styleUrl: './activity-tab.component.css'
})
export class ActivityTabComponent implements OnInit {

  private homeService = inject(HomeService);

  posts: Array<any> = [];

  ngOnInit(): void {
    this.homeService.getAllPosts();
    this.homeService.allPosts$.subscribe((data) => this.posts = data);
  }
}
