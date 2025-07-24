import { Component, inject, Input, OnInit } from '@angular/core';
import { PublicationCardComponent } from '../../../../publication-card/publication-card.component';
import { EventCardComponent } from '../../../../event-card/event-card.component';
import { HomeService } from '../../../../../../services/home.service';

@Component({
  selector: 'app-all-notifications',
  imports: [PublicationCardComponent, EventCardComponent],
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.css'
})
export class AllNotificationsComponent {

  private homeService = inject(HomeService);
  posts: Array<any> = [];

  ngOnInit(): void {
    this.homeService.getNearbyposts();
    this.homeService.allPosts$.subscribe((data) => this.posts = data);
  }
}
