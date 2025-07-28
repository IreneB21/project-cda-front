import { Component, inject, OnInit } from '@angular/core';

import { PostMakingFormComponent } from '../../../post-making-form/post-making-form.component';
import { PublicationCardComponent } from '../../../../shared/publication-card/publication-card.component';
import { EventCardComponent } from '../../../../shared/event-card/event-card.component';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-activity-tab',
  standalone: true,
  imports: [PublicationCardComponent, PostMakingFormComponent, EventCardComponent],
  templateUrl: './activity-tab.component.html',
})
export class ActivityTabComponent implements OnInit {

  private userService = inject(UserService);
  private userId = sessionStorage.getItem("userId");

  posts: Array<any> = [];

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserPosts(this.userId);
    }    
    this.userService.allPosts$.subscribe((data) => {
      this.posts = data.sort((post1, post2) => { 
        const date1 = "category" in post1 ? new Date(post1.publicationDate).valueOf() : new Date(post1.creationDate).valueOf();
        const date2 = "category" in post2 ? new Date(post2.publicationDate).valueOf() : new Date(post2.creationDate).valueOf();
       
        return date2 - date1;
      });
      //console.log(data);
    });
  }

  onPostAdded(event: any): void {
    this.posts.unshift(event);
  }

  onDeleteEvent(eventId: number): void {
    this.posts = this.posts.filter(post => !(!post.category && post.id === eventId));
  }

  onDeletePublication(publicationId: number): void {
    this.posts = this.posts.filter(post => !(!!post.category && post.id === publicationId));
  }
}