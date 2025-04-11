import { Component, inject, OnInit } from '@angular/core';
import { SideEventCardComponent } from './side-event-card/side-event-card.component';
import { PostMakingFormComponent } from '../../../../member/post-making-form/post-making-form.component';
import { EventGetDto } from '../../../../../models/event-get.dto';
import { EventService } from '../../../../../services/event.service';
import { HomeService } from '../../../../../services/home.service';

@Component({
  selector: 'app-side-section',
  standalone: true,
  imports: [SideEventCardComponent, PostMakingFormComponent],
  templateUrl: './side-section.component.html',
  styleUrl: './side-section.component.css'
})
export class SideSectionComponent implements OnInit {

  private eventService = inject(EventService);
  private homeService = inject(HomeService);

  events: Array<EventGetDto> = [];
  randomPics: Array<string> = [];
  
  ngOnInit(): void {
    this.homeService.getRandomUserPictures().subscribe((data) => {
      this.randomPics = data;
    })
    this.homeService.getAllPosts();
    //this.homeService.allPosts$.subscribe((data) => console.log(data));
    this.homeService.lastEvents$.subscribe();
  }
}
