import { Component, Input } from '@angular/core';
import { PublicationGetDto } from '../../../models/publication-get.dto';

@Component({
  selector: 'app-publication-card',
  standalone: true,
  imports: [],
  templateUrl: './publication-card.component.html',
  styleUrl: './publication-card.component.css'
})
export class PublicationCardComponent {
  @Input() data!: PublicationGetDto;
}
