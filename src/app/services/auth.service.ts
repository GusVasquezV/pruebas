import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import {UserInterface} from '../models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });

  /*registerUser(name: string, email: string, password: string){ no esta considerado en las especificaciones
    const url_api = "http://127.0.0.1:8000/api/auth"; 
  }*/

  loginUser(email: string, password: string): Observable<any> {
    const url_api = "http://127.0.0.1:8000/api/auth/login";
    
    return this.http.post<UserInterface>(url_api, {email, password}, {headers: this.headers})
    .pipe(map(data => data));
  }

  setUser(user: UserInterface){
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }

  setToken(token){
    localStorage.setItem('accessToken', token);
  }

  getToken(){
    return localStorage.getItem('accessToken');
  }

  getCurrentUser():UserInterface{
    let user_string = localStorage.getItem('currentUser');

    if(isNullOrUndefined(user_string)){
      let user: UserInterface = JSON.parse(user_string);
      return user;
    }else{
      return null;
    }
  }

  logoutUser(){
    let accessToken = localStorage.getItem('accessToken');
    const url_api = "http://127.0.0.1:8000/api/auth/logout"; //TODO service auth login user angular 6 min 16:00

    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');

    return this.http.post<UserInterface>(url_api, {headers: this.headers});

  }

}
