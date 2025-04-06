import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Publication {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    username: string;
    profilePictureUrl: string;
  };
  date: Date;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor() { }

  private mockPublications: Publication[] = [
    {
      id: 1,
      user: {
        firstName: 'Claire',
        lastName: 'Martin',
        username: 'claireM',
        profilePictureUrl: 'assets/users/claire.jpg'
      },
      date: new Date(),
      content: 'Un magnifique lever de soleil ce matin 🌅',
      imageUrl: 'assets/posts/sunrise.jpg',
      likes: 15,
      comments: 3
    },
    {
      id: 2,
      user: {
        firstName: 'Julien',
        lastName: 'Durand',
        username: 'julienD',
        profilePictureUrl: 'assets/users/julien.jpg'
      },
      date: new Date(),
      content: 'Quelqu’un a vu mon chat ? 😿',
      likes: 23,
      comments: 5
    }
  ];

  getPublications(): Observable<Publication[]> {
    return of(this.mockPublications);
  }
}
