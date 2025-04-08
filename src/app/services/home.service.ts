import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/display/all`, this.httpOptions);
  }
}
