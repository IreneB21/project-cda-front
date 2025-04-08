import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicationCreateDto } from '../models/publication-create.dto';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private apiUrl = 'http://localhost:8080/api/rest/hello/neighbors/publication';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    })
  };
  private userId = sessionStorage.getItem("userId");

  constructor(private http: HttpClient) {}

  getPublications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${this.userId}/publications`, this.httpOptions);
  }

  savePublication(newPublication: PublicationCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, newPublication, this.httpOptions)
      .pipe(
        //catchError()
      );
  }
}
