import { Component, Input } from '@angular/core';
import { Publication } from '../../../services/publication.service';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
  @Input() data!: Publication;
}
