import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './model';

@Injectable()
export class AuthService {
  private readonly POST = '/api/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(this.POST, { email, password });
  }
}
