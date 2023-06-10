import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/Food';
import { ApiService } from '../services/contratos/contratos.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CarrierFormDialogComponent } from '../app/home/carriers/carriers-form-dialog.component';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { format } from 'date-fns';


@Component({
  selector: 'app-carriers-destino',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.css']
})

export class CarrierComponent {
  urlAtualiza: string = 'https://uj88w4ga9i.execute-api.sa-east-1.amazonaws.com/dev12';
  urlConsulta: string = 'https://4i6nb2mb07.execute-api.sa-east-1.amazonaws.com/dev13';
  query: string = 'Carriers';
  data: any;
  foods: Food[] = [];
  base: number = 3;
  ID: number = Date.now();
  comentario: string = "";
  exponent: number = 22;
  $even: any;
  $odd: any;
  dataSource: any;
  dialogRef: any;
  items$!: Observable<any[]>;
  items: any[] = [];
  constructor(public dialog: MatDialog, private dynamodbService: ApiService, private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  editDialog(item: Array<any>, url: string, table: string): void {
    const dialogRef = this.dialog.open(CarrierFormDialogComponent, {
      data: {
        itemsData: item,
        url: url,
        query: table
      },
      height: '350px',
      minWidth: '450px',
      position: {
        top: '10vh',
        left: '30vw'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        setTimeout(() => {
          this.getItemsFromDynamoDB();
        }, 200); // Ajuste o tempo de atraso conforme necessário
      }
      console.log('The dialog was closed');
    });
  }

  openDialog(item: Array<any>, url: string, table: string): void {
    const dialogRef = this.dialog.open(CarrierFormDialogComponent, {
      data: {
        itemsData: [],
        url: url,
        query: table
      },
      height: '350px',
      minWidth: '450px',
      position: {
        top: '10vh',
        left: '30vw'
      },


    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        setTimeout(() => {
          this.getItemsFromDynamoDB();
        }, 200); // Ajuste o tempo de atraso conforme necessário
      }
      console.log('The dialog was closed');

    });
  }

  ngOnInit(): void {
    this.getItemsFromDynamoDB();
  }

  getItemsFromDynamoDB(): void {
    const filtro = 'all';
    this.dynamodbService.getItems(this.query, this.urlConsulta, filtro).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          try {
            const items = JSON.parse(response.body);
            if (Array.isArray(items)) {
              this.items = items.map(item => ({ ...item, checked: false }));
              // Adiciona a chave 'checked' a cada item, com valor inicial como false
              // Forçar detecção de alterações após atualizar os dados
              this.cdr.detectChanges();
            } else {
              console.error('Invalid items data:', items);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        } else {
          console.error('Invalid response:', response);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteItem(ID: string, urlDeleta: string, query: string): void {
    this.dynamodbService.deleteItem(ID, this.urlAtualiza, this.query).subscribe(
      response => {
        setTimeout(() => {
          this.getItemsFromDynamoDB();
        }, 200); // Ajuste o tempo de atraso conforme necessário
      },
      error => {
        // Lógica para lidar com erros durante a deleção do item
      }
    );

  }

}
