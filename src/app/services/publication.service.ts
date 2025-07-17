import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { PublicationCreateDto } from '../models/publication-create.dto';
import { PublicationUpdateLikesDto } from '../models/publication-update-likes.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private readonly apiUrl = `${environment.apiUrl}/api/rest/hello/neighbors/publication`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    })
  };
  private userId = sessionStorage.getItem("userId");

  constructor(private http: HttpClient) {}

  getUserPublications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${this.userId}/publications`, this.httpOptions);
  }

  getAllPublications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all/publications`, this.httpOptions);
  }

  savePublication(newPublication: PublicationCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, newPublication, this.httpOptions)
      .pipe(
        //catchError()
      );
  }

  likePublication(likesData: PublicationUpdateLikesDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/like`, likesData, this.httpOptions);
  }

  dislikePublication(likesData: PublicationUpdateLikesDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/dislike`, likesData, this.httpOptions);
  }
}
