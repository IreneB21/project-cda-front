import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { PostMakingFormComponent } from '../../../../member/post-making-form/post-making-form.component';
import { PublicationCardComponent } from '../../../publication-card/publication-card.component';
import { EventCardComponent } from '../../../event-card/event-card.component';
import { HomeService } from '../../../../../services/home.service';

@Component({
  selector: 'app-flow-section',
  standalone: true,
  imports: [PublicationCardComponent, EventCardComponent, PostMakingFormComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './flow-section.component.html'
})
export class FlowSectionComponent implements OnInit {

  private homeService = inject(HomeService);

  posts: Array<any> = [];

  button = "inline-flex items-center h-10 px-10 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none";
  active = "";
  inactive = "";

  ngOnInit(): void {
    this.homeService.getAllPosts();
    this.homeService.allPosts$.subscribe((data) => this.posts = data);
  }
}
