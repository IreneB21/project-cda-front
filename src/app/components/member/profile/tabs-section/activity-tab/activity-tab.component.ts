import { Component, inject, OnInit } from '@angular/core';
import {PublicationService } from '../../../../../services/publication.service';
import { PublicationComponent } from '../../../publication/publication.component';
import { PostMakingFormComponent } from '../../../post-making-form/post-making-form.component';
import { PublicationGetDto } from '../../../../../models/publication-get.dto';

@Component({
  selector: 'app-activity-tab',
  standalone: true,
  imports: [PublicationComponent, PostMakingFormComponent],
  templateUrl: './activity-tab.component.html',
  styleUrl: './activity-tab.component.css'
})
export class ActivityTabComponent implements OnInit {

  private publicationService = inject(PublicationService);

  //publications: Publication[] = [];
  publications!: Array<PublicationGetDto>

  ngOnInit(): void {
    this.publicationService.getPublications().subscribe((data) => {
      this.publications = data;
    });
  }
}
