import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventCreateDto } from '../models/event-create.dto';
import { EventUpdateParticipantsDto } from '../models/event-update-participants.dto';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/api/rest/hello/neighbors/event';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    })
  };
  private userId = sessionStorage.getItem("userId");

  constructor(private http: HttpClient) {}

  getUserEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${this.userId}/events`, this.httpOptions);
  }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all/events`, this.httpOptions);
  }

  saveEvent(eventData: EventCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, eventData, this.httpOptions)
    .pipe(
      //catchError()
    );
  }

  participate(participationData: EventUpdateParticipantsDto): Observable<any> {
    console.log(participationData);
    
    return this.http.post(`${this.apiUrl}/join`, participationData, this.httpOptions);
  } 

  cancelParticipation(participationData: EventUpdateParticipantsDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/leave`, participationData, this.httpOptions);
  }
}
