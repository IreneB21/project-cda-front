import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicationCreateDto } from '../models/publication-create.dto';
import { catchError, Observable, of } from 'rxjs';

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

  private apiUrl = 'http://localhost:8080/api/rest/hello/neighbors/publication';
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
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    })
  };

  constructor(private http: HttpClient) {}

  getPublications(): Observable<Publication[]> {
  
    /*
    http.get<Config>('/api/config').subscribe(config => {
      // process the configuration.
    });
    */
    return of(this.mockPublications);
  }

  savePublication(newPublication: PublicationCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, newPublication, this.httpOptions)
      .pipe(
        //catchError()
      );
  }
}
