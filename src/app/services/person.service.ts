import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from  '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { map, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { PersonInterface } from '../models/person-interface';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, private authService: AuthService) {   }
  
  people: Observable<any>;
  person: Observable<any>;
  
  url:string = "http://127.0.0.1:8000/api/";

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  headers: HttpHeaders = new HttpHeaders ({
    "Content-Type": "aplication/jason",
    Authorization: "Bearer " + this.authService.getToken()
  });

  getAllPerson() {
        
    return this.http.get(this.url+'people'); //, {headers: this.headers}
  }

  getAllInscription(){

    const url_api = 'http://127.0.0.1:8000/api/people/inscription';

    return this.http.get(url_api); //, {headers: this.headers}
  }

  deleteInscription(relation_id:string): Observable<{}>{
    
    return this.http.delete(this.url+'people/'+relation_id, {headers: this.headers})
    .pipe(
      catchError(this.handleError('deleteInscription'))
    );
  }
                       


  getPersonById(per_id: string, eve_id: string ){

    return this.http.get('http://127.0.0.1:8000/api/person/'+per_id+'/'+eve_id)
    .toPromise()
    .then(person=>person)
    .catch(error=>error);
    
  }

  savePerson(person: PersonInterface){
    let token = this.authService.getToken();

    return this.http.post(this.url+'person', person, {headers: this.headers}).pipe(map(data => data));
  }

  updatePerson(person){
    let token = this.authService.getToken();

    return this.http
    .put<PersonInterface>(this.url+'person/'+person.id, person, {headers: this.headers})
    .pipe(map(data => data));
  }

  deletePerson(id: string){
    let token = this.authService.getToken();

    return this.http
    .delete<PersonInterface>(this.url+'person/'+id, {headers: this.headers})
    .pipe(map(data => data));
  }



}
