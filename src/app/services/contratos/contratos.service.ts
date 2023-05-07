import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://o7f7w3t8hj.execute-api.sa-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }

  callAPI(base: number, exponent: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ base: base, exponent: exponent });

    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }
}
