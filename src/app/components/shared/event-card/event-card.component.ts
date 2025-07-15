import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventGetDto } from '../../../models/event-get.dto';
import { EventService } from '../../../services/event.service';
import { CommentService } from '../../../services/comment.service';
import { EventUpdateParticipantsDto } from '../../../models/event-update-participants.dto';
import { CommentsComponent } from '../comments/comments.component';
import { CommentGetDto } from '../../../models/comment-get.dto';


@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, CommentsComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
  host: { 'class': 'w-xl space-y-6 overflow-hidden font-sans rounded-md border px-6 py-4 bg-white' }
})
export class EventCardComponent {
  private eventService = inject(EventService);
  private commentService = inject(CommentService);
  private userId = Number(sessionStorage.getItem("userId"));

  private _data!: EventGetDto;

  comments: CommentGetDto[] = [];
  isCommentVIsible = false;


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
          userId: this.userId,
          join: true
    };

    this.eventService.participate(participationData).subscribe(() => {
      console.log('Participation added');
      this.data.participants.push({ id: this.userId, firstname: '', lastname: '' });
    });
  }

  leaveEvent(eventId: number) {
    const participationData: EventUpdateParticipantsDto = {
          eventId: eventId,
          userId: this.userId,
          join: false
    };

    this.eventService.cancelParticipation(participationData).subscribe(() => {
      console.log('Participation removed');
      this.data.participants = this.data.participants.filter(p => p.id !== this.userId);
    });
  }

  isUserParticipating(): boolean {
    const currentUserId = this.userId;
    return this.data.participants.some(p => p.id === currentUserId);
  }

  likeEvent(eventId: number) {
    const dto = {
      eventId,
      userId: this.userId,
      addLike: true
    };

    this.eventService.likeEvent(dto).subscribe(() => {
      console.log('Event liked');
      this.data.likes.push(this.userId);
    });
  }

  dislikeEvent(eventId: number) {
    const dto = {
      eventId,
      userId: this.userId,
      addLike: false
    };

    this.eventService.dislikeEvent(dto).subscribe(() => {
      console.log('Event unliked');
      this.data.likes = this.data?.likes.filter(id => id !== this.userId);
    });
  }

  getEventComments(): void {
    this.commentService.getEventComments(this.data.id).subscribe(comments => this.comments = comments);
  }

  onPostComment(comment: string): void {
    this.commentService.postEventComment(this.data.id, this.userId, comment).subscribe({
      next: comment => this.comments.push({ id: 1, body: comment, authorName: 'paul' }),//[...this.comments, { id: this.data.id, body: comment, authorId: this.userId }],
      error: error => console.log(error)
    });
  }

  toggleCommentsDisplay(): void {
    this.isCommentVIsible = !this.isCommentVIsible;
    if(this.comments.length == 0) {
      this.getEventComments();
    }
  }

  isLikedByUser(): boolean {
    return this.data?.likes?.includes(this.userId) ?? false;
  }
}
