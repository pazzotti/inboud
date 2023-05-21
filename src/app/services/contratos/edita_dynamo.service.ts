import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Item} from '../contratos/itens_contrato.model'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiUrl = 'https://68b0pyxkq6.execute-api.sa-east-1.amazonaws.com/dev3'; // substituir pela url da sua API

  constructor(private http: HttpClient) { }

  // Método para obter todos os itens do DynamoDB




  getItems2(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);

  }

  getItems(query: string): Observable<any[]> {
    return this.http.get('https://bptdz1ciyi.execute-api.sa-east-1.amazonaws.com/Dev7').pipe(
      map((response: any) => response.body),
      catchError((error: any) => of([]))
    );
  }

  // Método para obter um item específico pelo ID
  getItemById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/items/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  callAPI(ID:number, liner:string, tripcost:number, freetime:number, fsperiod:number, scperiod:number, tdperiod:number, comentario: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ ID:ID, liner:liner, tripcost:tripcost, freetime:freetime,fsperiod:fsperiod, scperiod:scperiod, tdperiod:tdperiod, comentario:comentario});

    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }


  updateItem(id: string, updatedData: Item): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(updatedData);
    return this.http.post<any>('https://68b0pyxkq6.execute-api.sa-east-1.amazonaws.com/dev3', updatedData);
  }



  // Método para deletar um item específico pelo ID
  deleteItem(updatedData: Item): Observable<any> {
    return this.http.post<any>('https://qfmsp2q7g1.execute-api.sa-east-1.amazonaws.com/dev4/', updatedData)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Método para tratar erros de requisição HTTP
  private handleError(error: any) {
    console.error('An error occurred', error); // Log do erro no console
    return Observable.create((observer: { error: (arg0: string) => void; }) =>{
      observer.error('Erro no servidor')
    })

  }
}
