import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private userData = 'assets/mockData.json';

  constructor(private http: HttpClient) { }

  public getMockUsers():Observable<any>{
    return this.http.get(this.userData).pipe(
      retry(4),
      catchError(this.handleError<any>('getMockUsers'))
    );
  }

  private handleError<T> (operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };

  }
}
