import { Component, inject, OnInit } from '@angular/core';
import {Publication, PublicationService } from '../../../../../services/publication.service';
import { PublicationComponent } from '../../../publication/publication.component';

@Component({
  selector: 'app-activity-tab',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './activity-tab.component.html',
  styleUrl: './activity-tab.component.css'
})
export class ActivityTabComponent implements OnInit {
  
  publications: Publication[] = [];

  private publicationService = inject(PublicationService);

  ngOnInit(): void {
    this.publicationService.getPublications().subscribe((data) => {
      this.publications = data;
    });
  }
}
