import { Component, inject, Input } from '@angular/core';

import { EventGetDto } from '../../../models/event-get.dto';
import { EventService } from '../../../services/event.service';
import { EventUpdateParticipantsDto } from '../../../models/event-update-participants.dto';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() data!: EventGetDto;

  private eventService = inject(EventService);
  private userId = sessionStorage.getItem("userId");

  participateToEvent(eventId: number) {
    const participationData: EventUpdateParticipantsDto = {
          eventId: eventId,
          userId: Number(this.userId),
          join: true
    };

    this.eventService.participate(participationData).subscribe(
      () => console.log('Participation added')
    );
  }

  leaveEvent(eventId: number) {
    const participationData: EventUpdateParticipantsDto = {
          eventId: eventId,
          userId: Number(this.userId),
          join: false
    };

    this.eventService.cancelParticipation(participationData).subscribe(
      () => console.log('Participation removed')
    );
  }
}
