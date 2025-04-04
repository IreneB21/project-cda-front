import { Component } from '@angular/core';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.css'
})
export class InfosComponent {
  user = {
    firstname: 'Alice',
    lastname: 'Dupont',
    pseudonym: 'Lili',
    createdAt: '2023-09-12T10:15:00Z',
  };

  get displayPseudonym(): string | null {
    return this.user.pseudonym ? `@${this.user.pseudonym}` : null;
  }

  get formattedDate(): string {
    return new Date(this.user.createdAt).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
