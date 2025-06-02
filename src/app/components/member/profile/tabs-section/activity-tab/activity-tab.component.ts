import { Component, inject, OnInit } from '@angular/core';
import {PublicationService } from '../../../../../services/publication.service';
import { PostMakingFormComponent } from '../../../post-making-form/post-making-form.component';
import { PublicationGetDto } from '../../../../../models/publication-get.dto';
import { PublicationCardComponent } from '../../../../shared/publication-card/publication-card.component';

@Component({
  selector: 'app-activity-tab',
  standalone: true,
  imports: [PublicationCardComponent, PostMakingFormComponent],
  templateUrl: './activity-tab.component.html',
  styleUrl: './activity-tab.component.css'
})
export class ActivityTabComponent implements OnInit {

  private publicationService = inject(PublicationService);

  publications!: Array<PublicationGetDto>

  ngOnInit(): void {
    this.publicationService.getUserPublications().subscribe((data) => {
      this.publications = data;
    });
  }
}
