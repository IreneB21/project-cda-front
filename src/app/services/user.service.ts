import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BioUpdateDto } from '../models/bio-update.dto';

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

  constructor(private http: HttpClient) {}

  getUserInfos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${this.userId}/infos`, this.httpOptions);
  }

  updateIntroduction(bio: BioUpdateDto): void {
    this.http.put(`${this.apiUrl}/profile/update/bio`, bio, this.httpOptions);
  }
}
