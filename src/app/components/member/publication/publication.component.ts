import { Component, Input } from '@angular/core';
import { PublicationGetDto } from '../../../models/publication-get.dto';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
  @Input() data!: PublicationGetDto;
}
