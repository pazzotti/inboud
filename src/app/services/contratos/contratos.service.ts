import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://o7f7w3t8hj.execute-api.sa-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }



  salvar(ID:number, liner:string, tripcost:number, freetime:number, fsperiod:number, scperiod:number, tdperiod:number, comentario: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ ID:ID, liner:liner, tripcost:tripcost, freetime:freetime,fsperiod:fsperiod, scperiod:scperiod, tdperiod:tdperiod, comentario:comentario});

    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }
}
