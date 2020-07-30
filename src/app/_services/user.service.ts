import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {RegisterRequest, User} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest) {
    return this.http.post(`http://localhost:8081/user/create`, registerRequest);
  }

}
