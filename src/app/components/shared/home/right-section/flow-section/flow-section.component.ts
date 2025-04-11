import { Component, inject, OnInit } from '@angular/core';
import { PostMakingFormComponent } from '../../../../member/post-making-form/post-making-form.component';
import { PublicationCardComponent } from '../../../publication-card/publication-card.component';
import { EventCardComponent } from '../../../event-card/event-card.component';
import { PublicationService } from '../../../../../services/publication.service';
import { EventService } from '../../../../../services/event.service';
import { PublicationGetDto } from '../../../../../models/publication-get.dto';
import { EventGetDto } from '../../../../../models/event-get.dto';
import { forkJoin } from 'rxjs';
import { HomeService } from '../../../../../services/home.service';

@Component({
  selector: 'app-flow-section',
  standalone: true,
  imports: [PublicationCardComponent, EventCardComponent, PostMakingFormComponent],
  templateUrl: './flow-section.component.html'
})
export class FlowSectionComponent implements OnInit {

  private homeService = inject(HomeService);

  posts: Array<any> = [];

  ngOnInit(): void {

    this.homeService.getAllPosts();
    this.homeService.allPosts$.subscribe((data) => this.posts = data);
  }
}
