import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { PublicationCardComponent } from '../../../shared/publication-card/publication-card.component';
import { EventCardComponent } from '../../../shared/event-card/event-card.component';
import { RouteService } from '../../../../services/route.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-activity-section-visitor',
  imports: [CommonModule, RouterOutlet, PublicationCardComponent, EventCardComponent],
  templateUrl: './activity-section-visitor.component.html',
})
export class ActivitySectionVisitorComponent {

  constructor(
      private userService: UserService,
  ) {}

  private route = inject(ActivatedRoute);
  private routeService = inject(RouteService);
  profileUserId = this.routeService.getProfileUserIdFromRoute(this.route);
  posts: Array<any> = [];

  /* button = "inline-flex items-center h-10 lg:px-15 px-3 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none ";
  active = "text-black border-black dark:border-blue-400 dark:text-blue-300";
  inactive = "text-gray-500 border-transparent dark:text-gray-400 cursor-pointer hover:border-gray-400";
  */
  ngOnInit(): void {
    if (this.profileUserId) {
      this.userService.getUserPosts(this.profileUserId);
    }
    this.userService.allPosts$.subscribe((data) => this.posts = data);
  }
}
