import { Component, EventEmitter, inject, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PublicationGetDto } from '../../../models/publication-get.dto';
import { PublicationService } from '../../../services/publication.service';
import { CommentService } from '../../../services/comment.service';
import { CommentGetDto } from '../../../models/comment-get.dto';
import { CommentsComponent } from '../comments/comments.component';
import { PublicationUpdateDto } from '../../../models/publication-update.dto';
import { AutofillAddressInputComponent } from '../autofill-address-input/autofill-address-input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-publication-card',
  standalone: true,
  imports: [DatePipe, CommentsComponent, ReactiveFormsModule, AutofillAddressInputComponent, NgFor, RouterLink],
  providers: [{provide: LOCALE_ID, useValue:'fr-FR'}],
  templateUrl: './publication-card.component.html',
  styleUrl: './publication-card.component.css',
  host: { 'class': 'w-xl space-y-6 overflow-hidden font-sans rounded-md border px-6 py-4 bg-white' },
})
export class PublicationCardComponent implements OnInit, OnChanges {
  private publicationService = inject(PublicationService);
  private commentService = inject(CommentService);
  private fb = inject(FormBuilder);

  @Input() data!: PublicationGetDto;
  @Input() isEditable = false;

  @Output() onDelete = new EventEmitter<number>();

  userId = Number(sessionStorage.getItem('userId'));
  comments: CommentGetDto[] = [];
  isCommentVIsible = false;
  isEditing = false;
  editForm!: FormGroup;
  uploadedImageUrls: string[] = [];

  ngOnInit() {
    this.editForm = this.fb.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description, Validators.required],
      city: [this.data.city],
      postalCode: [this.data.postalCode],
      street: [this.data.street],
      address: [`${this.data.street} ${this.data.postalCode} ${this.data.city}`],
      illustrations: [[]]
    });

    this.uploadedImageUrls = [...this.data.illustrations];

    //console.log(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["data"] && !!this.editForm) {
      this.editForm.setValue({
      title: this.data.title,
      description: this.data.description,
      city: this.data.city,
      postalCode: this.data.postalCode,
      street: this.data.street,
      address: `${this.data.street} ${this.data.postalCode} ${this.data.city}`,
      illustrations: []
    });
    }
  }

  enterEditMode(): void {
    this.isEditing = true;
  }

  cancelUpdate(): void {
    this.isEditing = false;

    this.editForm.setValue({
      title: this.data.title,
      description: this.data.description,
      city: this.data.city,
      postalCode: this.data.postalCode,
      street: this.data.street,
      address: `${this.data.street} ${this.data.postalCode} ${this.data.city}`,
      illustrations: []
    });
  }

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

  updatePublication(): void {
    const formValues = this.editForm.value;

    const { street, city, postalCode } = this.splitAddress(formValues.address);

    const updateDto: PublicationUpdateDto = {
      publicationId: this.data.id,
      title: formValues.title,
      city,
      postalCode,
      street,
      description: formValues.description,
      illustrations: formValues.illustrations
    };

    this.publicationService.updatePublication(updateDto).subscribe({
      next: (updatedData) => {
        this.data = updatedData;
        this.isEditing = false;
      },
      error: (err) => console.error(err)
    });
  }

  deletePublication(id: number): void {
    //@Todo : afficher message de confirmation (en fonction du booléen)
    this.publicationService.deletePublication(id).subscribe();
    this.onDelete.emit(id);
    //window.location.reload();
  }

  likePublication(publicationId: number) {
    const dto = {
      publicationId,
      userId: this.userId,
      addLike: true
    };

    this.publicationService.likePublication(dto).subscribe(() => {
      console.log('Publication liked');
      this.data.likes.push(this.userId);
    });
  }

  dislikePublication(publicationId: number) {
    const dto = {
      publicationId,
      userId: this.userId,
      addLike: false
    };

    this.publicationService.dislikePublication(dto).subscribe(() => {
      console.log('Publication unliked');
      this.data.likes = this.data.likes.filter(id => id !== this.userId);
    });
  }

  getPublicationComments(): void {
    this.commentService.getPublicationComments(this.data.id).subscribe(comments => this.comments = comments);
  }

  onPostComment(comment: string): void {
    this.commentService.postPublicationComment(this.data.id, this.userId, comment).subscribe({
      next: comment => this.comments.push(comment),//[...this.comments, { id: this.data.id, body: comment, authorId: this.userId }],
      error: error => console.log(error)
    });
  }

  toggleCommentsDisplay(): void {
    this.isCommentVIsible = !this.isCommentVIsible;
    if (this.comments.length == 0) {
      this.getPublicationComments();
    }
  }

  isLikedByUser(): boolean {
    return this.data?.likes?.includes(this.userId) ?? false;
  }

  private splitAddress(address: string): { street: string; city: string; postalCode: string } {
    const postalCodeRegex = /\b\d{5}\b/;
    const match = address.match(postalCodeRegex);
  
    if (match) {
      const postalCode = match[0];
      const parts = address.replace(postalCode, '').trim().split(/\s+/);
      const postalCodeIndex = address.indexOf(postalCode);
      
      const before = address.substring(0, postalCodeIndex).trim();
      const after = address.substring(postalCodeIndex + postalCode.length).trim();
  
      let street = before;
      let city = after;
  
      if (!city && parts.length > 0) {
        city = parts.slice(-1)[0];
      }
  
      return {
        street,
        postalCode,
        city
      };
    }
  
    console.warn('Adresse non reconnue :', address);
    return { street: '', postalCode: '', city: '' };
  }
}
