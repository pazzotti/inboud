import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  callAPI(base: number, exponent: number): void {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    const raw = JSON.stringify({"base":base,"exponent":exponent});
    const requestOptions = {
      headers: myHeaders,
      method: 'POST',
      body: raw,
      responseType: 'text' as const
    };
    this.http.post("https://o7f7w3t8hj.execute-api.sa-east-1.amazonaws.com/dev", requestOptions)
      .subscribe(response => {
        alert(response);
      },
      error => {
        console.log('error', error);
      });
  }
}
