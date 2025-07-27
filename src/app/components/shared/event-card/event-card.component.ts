import { Component, inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventGetDto } from '../../../models/event-get.dto';
import { EventService } from '../../../services/event.service';
import { CommentService } from '../../../services/comment.service';
import { EventUpdateParticipantsDto } from '../../../models/event-update-participants.dto';
import { CommentsComponent } from '../comments/comments.component';
import { CommentGetDto } from '../../../models/comment-get.dto';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EventUpdateDto } from '../../../models/event-update.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, CommentsComponent, CommentsComponent, ReactiveFormsModule, RouterLink],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
  host: { 'class': 'w-xl space-y-6 overflow-hidden font-sans rounded-md border px-6 py-4 bg-white' }
})
export class EventCardComponent implements OnInit {
  private eventService = inject(EventService);
  private commentService = inject(CommentService);
  private fb = inject(FormBuilder);
  private _data!: EventGetDto;

  @Input() isEditable = false;
  @Input() set data(value: EventGetDto) {
    value.participants = value.participants ?? [];
    value.likes = value.likes ?? [];
    this._data = value;
  }
  get data(): EventGetDto {
    return this._data;
  }

  userId = Number(sessionStorage.getItem("userId"));
  comments: CommentGetDto[] = [];
  isCommentVIsible = false;
  isEditing = false;
  editForm!: FormGroup;
  uploadedImageUrls: string[] = [];
  today = new Date().toISOString().split('T')[0];

  ngOnInit() {
    this.editForm = this.fb.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description, Validators.required],
      startDate: [this.data.startDate, [Validators.required, this.dateNotInPastValidator]],
      endDate: [this.data.endDate, Validators.required],
      //maxCapacity: [this.data.maxCapacity],
      city: [this.data.city],
      postalCode: [this.data.postalCode],
      street: [this.data.street],
      address: [`${this.data.street} ${this.data.postalCode} ${this.data.city}`],
      illustrations: [[]]
    }, { validators: this.dateRangeValidator });

    this.uploadedImageUrls = [...this.data.illustrations];

    this.editForm.get('startDate')?.valueChanges.subscribe(() => {
      this.editForm.get('startDate')?.updateValueAndValidity();
    });

    this.editForm.get('endDate')?.valueChanges.subscribe(() => {
      this.editForm.get('endDate')?.updateValueAndValidity();
    });
  }

  enterEditMode(): void {
    this.isEditing = true;
    console.log(this.data.illustrations);
  }

  cancelUpdate(): void {
    this.isEditing = false;
  }

  dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('startDate')?.value;
    const end = control.get('endDate')?.value;

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      if (startDate < today) {
        return { startDateInPast: true };
      }

      if (endDate < startDate) {
        return { invalidDateRange: true };
      }
    }

    return null;
  };

  dateNotInPastValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate && new Date(startDate) < today) {
      return { dateInPast: true };
    }

    return null;
  };


  selectedFiles: File[] = [];
  cloudName = 'dghkyleie';
  uploadPreset = 'hello_neighbors_upload_preset';

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const files = Array.from(target.files);

      files.forEach(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.uploadPreset);

        fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(data => {
            this.uploadedImageUrls.push(data.secure_url);
            this.editForm.get('illustrations')?.setValue(this.uploadedImageUrls);
          })
          .catch(err => {
            console.error('Erreur upload Cloudinary:', err);
          });
      });
    }
  }

  updateEvent(): void {
    if (this.editForm.invalid) {
      alert("Veuillez remplir tous les champs obligatoires correctement.");
      return;
    }

    const formValues = this.editForm.value;

    const updateDto: EventUpdateDto = {
      eventId: this.data.id,
      title: formValues.title,
      city: formValues.city,
      postalCode: formValues.postalCode,
      street: formValues.street,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      description: formValues.description,
      illustrations: formValues.illustrations
    }

    this.eventService.updateEvent(updateDto).subscribe({
      next: (updatedData) => {
        this.data = { ...this.data, ...updateDto };
        this.isEditing = false;
      },
      error: (err) => console.error(err)
    });
  }

  cancelEvent(id: number): void {
    //@Todo : afficher message de confirmation (en fonction du booléen)
    this.eventService.cancelEvent(id).subscribe();

    //window.location.reload();
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
      next: comment => this.comments.push(comment),//[...this.comments, { id: this.data.id, body: comment, authorId: this.userId }],
      error: error => console.log(error)
    });
  }

  toggleCommentsDisplay(): void {
    this.isCommentVIsible = !this.isCommentVIsible;
    if (this.comments.length == 0) {
      this.getEventComments();
    }
  }

  isLikedByUser(): boolean {
    return this.data?.likes?.includes(this.userId) ?? false;
  }
}
