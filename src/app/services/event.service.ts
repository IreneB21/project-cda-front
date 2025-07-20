import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventCreateDto } from '../models/event-create.dto';
import { EventUpdateParticipantsDto } from '../models/event-update-participants.dto';
import { EventGetDto } from '../models/event-get.dto';
import { EventUpdateLikesDto } from '../models/event-update-likes.dto';
import { environment } from '../../environments/environment';
import { EventUpdateDto } from '../models/event-update.dto';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly apiUrl = `${environment.apiUrl}/api/rest/hello/neighbors/event`;
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
    return this.http.put(`${this.apiUrl}/join`, participationData, this.httpOptions);
  } 

  cancelParticipation(participationData: EventUpdateParticipantsDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/leave`, participationData, this.httpOptions);
  }

  likeEvent(likesData: EventUpdateLikesDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/like`, likesData, this.httpOptions);
  }

  dislikeEvent(likesData: EventUpdateLikesDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/dislike`, likesData, this.httpOptions);
  }

  updateEvent(updatedEvent: EventUpdateDto): Observable<EventGetDto> {
    return this.http.patch<EventGetDto>(`${this.apiUrl}/update`, updatedEvent, this.httpOptions);
  }

  cancelEvent(id: number): void { //Observable<boolean>

  }
}
