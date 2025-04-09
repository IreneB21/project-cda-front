import { Component, inject, OnInit } from '@angular/core';
import { PostMakingFormComponent } from '../../../../member/post-making-form/post-making-form.component';
import { PublicationCardComponent } from '../../../publication-card/publication-card.component';
import { EventCardComponent } from '../../../event-card/event-card.component';
import { PublicationService } from '../../../../../services/publication.service';
import { EventService } from '../../../../../services/event.service';
import { PublicationGetDto } from '../../../../../models/publication-get.dto';
import { EventGetDto } from '../../../../../models/event-get.dto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-flow-section',
  standalone: true,
  imports: [PublicationCardComponent, EventCardComponent, PostMakingFormComponent],
  templateUrl: './flow-section.component.html'
})
export class FlowSectionComponent implements OnInit {

  private publicationService = inject(PublicationService);
  private eventService = inject(EventService);

  posts: Array<any> = [];
  publications: Array<PublicationGetDto> = [];
  events: Array<EventGetDto> = [];

  ngOnInit(): void {
    console.log("posts = " + this.posts);

    forkJoin({
      publications: this.publicationService.getAllPublications(),
      events: this.eventService.getAllEvents()
    }).subscribe(({ publications, events }) => {
      this.publications = publications;
      this.events = events;
  
      this.posts = [...this.publications, ...this.events];
  
      console.log("posts:", this.posts);
    });
  }
}
