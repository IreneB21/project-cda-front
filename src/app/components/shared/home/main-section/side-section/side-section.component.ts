import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
  styleUrl: './side-section.component.css',
  host: { 'class':'hidden lg:flex md:hidden flex-col gap-5 pl-7' }
})
export class SideSectionComponent implements OnInit {

  private eventService = inject(EventService);
  private homeService = inject(HomeService);

  events: Array<EventGetDto> = [];
  randomPics: Array<string> = [];
  nextThreeEvents: Array<EventGetDto> = [];
  totalUsersAround!: number;

  @Output() onPostAdded = new EventEmitter();
  
  ngOnInit(): void {
    this.homeService.getRandomUserPictures().subscribe((data) => {
      this.randomPics = data;
    })

    this.homeService.getTotalUsersAround().subscribe((data) => {
      this.totalUsersAround = data;
    });
    
    this.homeService.getNextThreeNearbyEvents().subscribe((data) => {
      this.nextThreeEvents = data;
      console.log(data);
    })
  }
}
