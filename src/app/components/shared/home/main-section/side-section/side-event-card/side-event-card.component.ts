import { Component, Input } from '@angular/core';
import { EventGetDto } from '../../../../../../models/event-get.dto';

@Component({
  selector: 'app-side-event-card',
  standalone: true,
  imports: [],
  templateUrl: './side-event-card.component.html',
  styleUrl: './side-event-card.component.css'
})
export class SideEventCardComponent {
  @Input() data!: EventGetDto;
}
