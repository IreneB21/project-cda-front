import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentGetDto } from '../models/comment-get.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  private readonly apiUrl = `${environment.apiUrl}/api/rest/hello/neighbors/comment`;
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      })
    };
  constructor(private http: HttpClient) { }

  getEventComments(eventId: number): Observable<CommentGetDto[]> {
    return this.http.get<CommentGetDto[]>(`${this.apiUrl}/event/${eventId}/associated/comments`, this.httpOptions);
  }

  postEventComment(eventId: number, authorId: number, text: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post/event/comment`, { body: text, authorId, parentId: eventId, parentCommentId: null }, this.httpOptions);
  }

  getPublicationComments(publicationId: number): Observable<CommentGetDto[]> {
    return this.http.get<CommentGetDto[]>(`${this.apiUrl}/publication/${publicationId}/associated/comments`, this.httpOptions);
  }

  postPublicationComment(publicationId: number, authorId: number, text: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post/publication/comment`, { body: text, authorId, parentId: publicationId, parentCommentId: null }, this.httpOptions);
  }
}
