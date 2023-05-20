import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaContrato {

  constructor(private http: HttpClient) { }

  getItems(query: string): Observable<any[]> {
    const apiUrl = `https://h2vvonulci.execute-api.sa-east-1.amazonaws.com/Dev6`;
    return this.http.get(apiUrl).pipe(
      map((response: any) => response.body),
      catchError((error: any) => of([]))
    );
  }
}
