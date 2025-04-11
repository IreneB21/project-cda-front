import { Component, Input } from '@angular/core';
import { EventGetDto } from '../../../models/event-get.dto';
import { PublicationGetDto } from '../../../models/publication-get.dto';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() data!: EventGetDto;
}
