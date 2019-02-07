import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { EventInterface } from '../models/event-interface';

@Injectable({
  providedIn: 'root'
})

export class DataApiService {

  constructor(private http: HttpClient, private authService: AuthService) {   }
  
  events: Observable<any>;
  event: Observable<any>;

  headers: HttpHeaders = new HttpHeaders ({
    "Content-Type": "aplication/jason",
    Authorization: this.authService.getToken()
  });

  getAllEvent() {
    const url_api = 'http://127.0.0.1:8000/api/events';
    
    return this.http.get(url_api);
  }

  getEventById(slug: string){
    const url_api = 'http://127.0.0.1:8000/api/event/'+slug;

    return this.http.get(url_api);
  }

  saveEvent(event: EventInterface){
    let token = this.authService.getToken();

    const url_api = 'http://127.0.0.1:8000/api/event/'; // + token

    return this.http.post(url_api, event, {headers: this.headers}).pipe(map(data => data));
  }

  updateEvent(event){
    let token = this.authService.getToken();

    const url_api = 'http://127.0.0.1:8000/api/event/'; // + token

    return this.http
    .put<EventInterface>(url_api, event, {headers: this.headers})
    .pipe(map(data => data));
  }

  deleteEvent(id: string){
    let token = this.authService.getToken();

    const url_api = 'http://127.0.0.1:8000/api/event/'; // + token

    return this.http
    .delete<EventInterface>(url_api, {headers: this.headers})
    .pipe(map(data => data));
  }


}
