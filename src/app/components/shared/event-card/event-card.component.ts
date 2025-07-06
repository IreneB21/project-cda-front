import { Component, inject, Input } from '@angular/core';

import { EventGetDto } from '../../../models/event-get.dto';
import { EventService } from '../../../services/event.service';
import { EventUpdateParticipantsDto } from '../../../models/event-update-participants.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  private eventService = inject(EventService);
  private userId = sessionStorage.getItem("userId");

  private _data!: EventGetDto;

  @Input() set data(value: EventGetDto) {
    value.participants = value.participants ?? [];
    value.likes = value.likes ?? [];
    this._data = value;
  }
  get data(): EventGetDto {
    return this._data;
  }

  participateToEvent(eventId: number) {
    const participationData: EventUpdateParticipantsDto = {
          eventId: eventId,
          userId: Number(this.userId),
          join: true
    };

    this.eventService.participate(participationData).subscribe(() => {
      console.log('Participation added');
      this.data.participants.push({ id: Number(this.userId), firstname: '', lastname: '' });
    });
  }

  leaveEvent(eventId: number) {
    const participationData: EventUpdateParticipantsDto = {
          eventId: eventId,
          userId: Number(this.userId),
          join: false
    };

    this.eventService.cancelParticipation(participationData).subscribe(() => {
      console.log('Participation removed');
      this.data.participants = this.data.participants.filter(p => p.id !== Number(this.userId));
    });
  }

  isUserParticipating(): boolean {
    const currentUserId = Number(this.userId);
    return this.data.participants.some(p => p.id === currentUserId);
  }

  likeEvent(eventId: number) {
    const dto = {
      eventId,
      userId: Number(this.userId),
      addLike: true
    };

    this.eventService.likeEvent(dto).subscribe(() => {
      console.log('Event liked');
      this.data.likes.push(Number(this.userId));
    });
  }

  dislikeEvent(eventId: number) {
    const dto = {
      eventId,
      userId: Number(this.userId),
      addLike: false
    };

    this.eventService.dislikeEvent(dto).subscribe(() => {
      console.log('Event unliked');
      this.data.likes = this.data.likes.filter(id => id !== Number(this.userId));
    });
  }

  isLikedByUser(): boolean {
    return this.data.likes?.includes(Number(this.userId)) ?? false;
  }
}
