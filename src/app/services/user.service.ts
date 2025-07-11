import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BioUpdateDto } from '../models/bio-update.dto';
import { UserGetForVisitorDto } from '../models/user-get-visitor.dto';
import { EventGetDto } from '../models/event-get.dto';
import { PublicationGetDto } from '../models/publication-get.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/rest/hello/neighbors/profile';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    })
  };
  private userId = sessionStorage.getItem("userId");

  private allPostsSubject = new BehaviorSubject<Array<EventGetDto | PublicationGetDto>>([]);
  allPosts$ = this.allPostsSubject.asObservable();
  private lastEventsSubject = new BehaviorSubject<Array<EventGetDto>>([]);
  lastEvents$ = this.lastEventsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserInfosById(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${this.userId}/infos`, this.httpOptions);
  }

  getUserInfosForVisitor(id: string): Observable<UserGetForVisitorDto> {
    return this.http.get<UserGetForVisitorDto>(`${this.apiUrl}/user/${id}/infos/visitor`, this.httpOptions);
  }

  updateIntroduction(bio: BioUpdateDto): void {
    this.http.put(`${this.apiUrl}/update/bio`, bio, this.httpOptions).subscribe(
      response => {
        console.log('Resource updated successfully', response);
      },
      error => {
        console.error('Error updating resource', error);
      }
    );
  }

  getUserPosts(id: string): void {
    this.http.get(`${this.apiUrl}/user/${id}/posts`, this.httpOptions).subscribe((data: any) => {
      this.allPostsSubject.next([...data.events, ...data.publications]);

      const today = new Date();
      const filteredEvents = data.events.filter((event: any) => {
        const eventDate = new Date(event.startDate);
        const eventValue = eventDate.valueOf();
        const todayValue = today.valueOf();
        return eventValue >= todayValue;
      });

      const lastEvents = filteredEvents.sort((a: any, b: any) => {
        return a.eventDate - b.eventDate;
      });
      
      this.lastEventsSubject.next(filteredEvents.sort((a: any, b: any) => {
        return a.eventDate - b.eventDate;
      }));
    });
  }
}
