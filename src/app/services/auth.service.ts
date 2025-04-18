import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationDto } from '../models/registration.dto';
import { Observable } from 'rxjs';
import { LoginDto } from '../models/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/rest/hello/neighbors/security';

  constructor(private http: HttpClient) {}

  register(user: RegistrationDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, user);
  }
}
