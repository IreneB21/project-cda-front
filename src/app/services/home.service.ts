import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { EventGetDto } from '../models/event-get.dto';
import { PublicationGetDto } from '../models/publication-get.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly apiUrl = `${environment.apiUrl}/api/rest/hello/neighbors/home`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    })
  };
  private userId = sessionStorage.getItem("userId");

  private allPostsSubject = new BehaviorSubject<Array<EventGetDto | PublicationGetDto>>([]);
  allPosts$ = this.allPostsSubject.asObservable();
  private lastEventsSubject = new BehaviorSubject<Array<EventGetDto>>([]);
  lastEvents$ = this.lastEventsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getNearbyposts(): void {
    this.http.get(`${this.apiUrl}/display/all/nearby/${this.userId}`, this.httpOptions).subscribe((data: any) => {
      this.allPostsSubject.next([...data.events, ...data.publications]);

      console.log(this.allPostsSubject);

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

  getAllPosts(): void {
    this.http.get(`${this.apiUrl}/display/all`, this.httpOptions).subscribe((data: any) => {
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

  getRandomUserPictures(): Observable<any> {
    return this.http.get(`${this.apiUrl}/display/random/user/pictures`, this.httpOptions);
  }
}
