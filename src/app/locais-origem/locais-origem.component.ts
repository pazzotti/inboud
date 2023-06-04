import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { Food } from '../shared/models/Food';
import { ApiService } from '../services/contratos/contratos.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Locais_OrigemModule } from './locais-origem.module';
import { Validators, FormControl } from '@angular/forms';
import { FormularioLocaisComponent } from '../formulario_locais/formulario_locais';
import { HttpClient } from '@angular/common/http';

@Injectable()
@Component({
  selector: 'app-locais-origem',
  templateUrl: './locais-origem.component.html',
  styleUrls: ['./locais-origem.component.css']
})

export class Locais_OrigemComponent {
  @ViewChild('myTable', { static: false }) myTableRef!: ElementRef;
  contato: FormControl = new FormControl('', [Validators.email]);
  urlConsulta: string = 'https://4i6nb2mb07.execute-api.sa-east-1.amazonaws.com/dev13';
  urlAtualiza: string = 'https://uj88w4ga9i.execute-api.sa-east-1.amazonaws.com/dev12';
  data:any;
  foods: Food[] = [];
  base: number = 3;
  ID: number = Date.now();
  liner: string = "";
  tripcost: number = 0;
  freetime: number = 0;
  fsperiod: number = 0;
  scperiod: number = 0;
  tdperiod: number = 0;
  comentario: string = "";
  exponent: number = 22;
  query: string = 'Locais_Origem_Inbound';
  $even: any;
  $odd: any;
  itemsData: any;
  items$!: Observable<any[]>;
  dataSource: any;
  dialogRef: any;
  constructor(private apiService: ApiService, public dialog: MatDialog, private dynamodbService: ApiService, private http: HttpClient) {

  }


  ngOnInit(): void {
    const filtro = '';
    this.items$ = this.dynamodbService.getItems(this.query, this.urlConsulta,filtro).pipe(
      map(data => {
        const parsedData = JSON.parse(data.body); // Parse a string JSON contida em data.body
        return parsedData; // Retorna o objeto JSON parseado
      })
    );

    this.items$.subscribe(
      items => {
        console.log(items);
      },
      error => {
        console.error(error);
      }
    );
  }

  public buscarItens() {
    const tableName = this.query;
    const urlConsulta = this.urlConsulta;
    const filtro = '';
    this.dynamodbService.getItems(tableName, this.urlConsulta,filtro).subscribe(
      response => {
        // Manipule a resposta da API aqui
        console.log(response);
      },
      error => {
        // Lida com erros da API aqui
        console.error(error);
      }
    );
  }

  editDialog(item: Array<any>, url: string, table: string): void {
    const dialogRef = this.dialog.open(FormularioLocaisComponent, {
      data: {
        itemsData: item,
        url: url,
        query: table
      },
      height: '550px',
      minWidth: '850px',
      position: {
        top: '10vh',
        left: '30vw'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteItem(Data: string) {
    this.ID = Date.now()
    this.data.ID = Data;
    if (this.data.ID == ""){
      this.dataSource.ID = this.ID;
    }
    this.dataSource.local = this.data.item.local;
    this.dataSource.endereco = this.data.item.endereco;
    this.dataSource.contato = this.data.item.contato;

    this.apiService.salvar(this.dataSource, this.data.local, this.urlAtualiza ).subscribe(response => {

    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
