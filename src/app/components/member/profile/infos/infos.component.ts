import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.css'
})
export class InfosComponent implements OnInit {
  
  private userService = inject(UserService);

  user: any;

  avatars: Array<string> = [
    '/avatar1.jpg',
    '/avatar2.jpg',
    '/avatar3.jpg',
    '/avatar4.jpg'
  ]

  ngOnInit(): void {
    this.userService.getUserInfos().subscribe((data) => {
      this.user = data;
      if (this.user.picture === null) {
        this.user.picture = this.avatars[Math.floor(Math.random() * this.avatars.length)];
      }
    });
  }

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
