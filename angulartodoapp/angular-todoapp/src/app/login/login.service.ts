  import {Injectable} from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  
  import { User } from '../models/user.model';
  
  
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable()
  export class LoginService {
  
    constructor(private http:HttpClient) {}
  
    private userUrl = 'http://localhost:8080/api/login';

    public loginUser(user) {
      return this.http.post<User>(this.userUrl, user)
    }
}