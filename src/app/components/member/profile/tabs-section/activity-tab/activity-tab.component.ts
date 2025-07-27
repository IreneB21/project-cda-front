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
        const date1 = "category" in post1 ? post1.publicationDate.valueOf() : post1.creationDate.valueOf();
        const date2 = "category" in post2 ? post2.publicationDate.valueOf() : post2.creationDate.valueOf();
       
        return date2 - date1;
      });
      //console.log(data);
    });
  }

  onPostAdded(event: any): void {
    this.posts.unshift(event);
  }
}