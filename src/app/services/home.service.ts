import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventGetDto } from '../models/event-get.dto';
import { PublicationGetDto } from '../models/publication-get.dto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8080/api/rest/hello/neighbors/home';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    })
  };

  private allPostsSubject = new BehaviorSubject<Array<EventGetDto | PublicationGetDto>>([]);
  allPosts$ = this.allPostsSubject.asObservable();
  private lastEventsSubject = new BehaviorSubject<Array<EventGetDto>>([]);
  lastEvents$ = this.lastEventsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllPosts(): void {
    //  {events: Array<EventGetDto>, publications: Array<PublicationGetDto>}
    this.http.get(`${this.apiUrl}/display/all`, this.httpOptions).subscribe((data: any) => {
      this.allPostsSubject.next([...data.events, ...data.publications]);

      const today = new Date();
      const filteredEvents = data.events.filter((event: any) => {
        const eventDate = new Date(event.startDate);
        const eventValue = eventDate.valueOf();
        const todayValue = today.valueOf();
        return eventValue >= todayValue;
      });

      this.lastEventsSubject.next(filteredEvents);
        /*data.events
          .filter((event: any) => new Date(event.startDate) > today));
        //.sort((a, b) => a.))
      //items.sort((a, b) => a.value - b.value);*/
    });
  }

  getRandomUserPictures(): Observable<any> {
  return this.http.get(`${this.apiUrl}/display/random/user/pictures`, this.httpOptions);
}}
