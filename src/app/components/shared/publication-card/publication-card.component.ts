import { Component, inject, Input } from '@angular/core';
import { PublicationGetDto } from '../../../models/publication-get.dto';
import { PublicationService } from '../../../services/publication.service';

@Component({
  selector: 'app-publication-card',
  standalone: true,
  imports: [],
  templateUrl: './publication-card.component.html',
  styleUrl: './publication-card.component.css'
})
export class PublicationCardComponent {
  private publicationservice = inject(PublicationService);
  private userId = sessionStorage.getItem("userId");

  @Input() data!: PublicationGetDto;

  likePublication(publicationId: number) {
    const dto = {
      publicationId,
      userId: Number(this.userId),
      addLike: true
    };

    this.publicationservice.likePublication(dto).subscribe(() => {
      console.log('Publication liked');
      this.data.likes.push(Number(this.userId));
    });
  }

  dislikePublication(publicationId: number) {
    const dto = {
      publicationId,
      userId: Number(this.userId),
      addLike: false
    };

    this.publicationservice.dislikePublication(dto).subscribe(() => {
      console.log('Publication unliked');
      this.data.likes = this.data.likes.filter(id => id !== Number(this.userId));
    });
  }

  isLikedByUser(): boolean {
    return this.data.likes?.includes(Number(this.userId)) ?? false;
  }
}
