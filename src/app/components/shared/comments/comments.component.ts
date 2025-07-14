import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentGetDto } from '../../../models/comment-get.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input() comments: CommentGetDto[] = [];
  @Output() onPostCommentOutput = new EventEmitter<string>();

  text = '';

  onPostComment(e: Event) {
    this.onPostCommentOutput.emit(this.text);
    this.text = '';
  }
}
