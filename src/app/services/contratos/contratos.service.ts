import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Contratos {

  constructor(private http: HttpClient) { }

  callApi(apiUrl: string): void {
    this.http.get(apiUrl).subscribe(response => {
      console.log(response);
    });
  }

}
