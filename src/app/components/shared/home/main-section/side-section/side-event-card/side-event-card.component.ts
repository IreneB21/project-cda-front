import { Component, Input } from '@angular/core';
import { EventGetDto } from '../../../../../../models/event-get.dto';

@Component({
  selector: 'app-side-event-card',
  imports: [],
  templateUrl: './side-event-card.component.html',
  styleUrl: './side-event-card.component.css',
})
export class SideEventCardComponent {
  @Input() data!: EventGetDto;

  private readonly randomIllustrations: string[] = [
    'random-pic1.jpg',
    'random-pic2.jpg',
    'random-pic3.jpg',
  ];

  randomPic: string = '';

  constructor() {
    const randomIndex = Math.floor(Math.random() * this.randomIllustrations.length);
    this.randomPic = `/events/${this.randomIllustrations[randomIndex]}`;
  }
}
