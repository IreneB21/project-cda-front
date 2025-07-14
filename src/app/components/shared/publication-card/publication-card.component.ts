import { Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { PublicationGetDto } from '../../../models/publication-get.dto';
import { PublicationService } from '../../../services/publication.service';
import { CommentService } from '../../../services/comment.service';
import { CommentGetDto } from '../../../models/comment-get.dto';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-publication-card',
  standalone: true,
  imports: [DatePipe, CommentsComponent],
  templateUrl: './publication-card.component.html',
  styleUrl: './publication-card.component.css',
  host: { 'class':'w-xl space-y-6 overflow-hidden font-sans rounded-md border px-6 py-4 bg-white' },
})
export class PublicationCardComponent {
  private publicationservice = inject(PublicationService);
  private commentService = inject(CommentService);
  private userId = Number(sessionStorage.getItem("userId"));

  @Input() data!: PublicationGetDto;

  comments: CommentGetDto[] = [];
  isCommentVIsible = false;

  likePublication(publicationId: number) {
    const dto = {
      publicationId,
      userId: this.userId,
      addLike: true
    };

    this.publicationservice.likePublication(dto).subscribe(() => {
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

    this.publicationservice.dislikePublication(dto).subscribe(() => {
      console.log('Publication unliked');
      this.data.likes = this.data.likes.filter(id => id !== this.userId);
    });
  }

  getPublicationComments(): void {
    this.commentService.getPublicationComments(this.data.id).subscribe(comments => this.comments = comments);
  }

  onPostComment(comment: string): void {
    this.commentService.postPublicationComment(this.data.id, this.userId, comment).subscribe({
      next: comment => this.comments.push({ id: 1, body: comment, authorName: 'paul' }),//[...this.comments, { id: this.data.id, body: comment, authorId: this.userId }],
      error: error => console.log(error)
    });
  }


  toggleCommentsDisplay(): void {
    this.isCommentVIsible = !this.isCommentVIsible;
    if(this.comments.length == 0) {
      this.getPublicationComments();
    }
  }

  isLikedByUser(): boolean {
    return this.data.likes?.includes(this.userId) ?? false;
  }
}
