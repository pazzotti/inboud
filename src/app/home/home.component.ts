import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';
import { ApiService } from '../services/contratos/contratos.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LiveFormDialogComponent } from '../app/home/live-form-dialog/live-form-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DynamoDBService } from '../services/contratos/consulta.service';
import { HomeModule } from './home.module';
import { ItemsService } from '../services/contratos/edita_dynamo.service';
import { Item } from '../services/contratos/itens_contrato.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  items: Item[] = [];
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
  query: string = '';
  items$ = this.dynamodbService.getItems(this.query);
  $even: any;
  $odd: any;
  updatedData: Item = {
    ID: "",
    comentario: '',
    fsperiod: 0,
    scperiod: 0,
    tdperiod: 0,
    liner: '',
    freetime: 0,
    tripcost: 0,
    LatestGreetingTime: ''
  };
  constructor(private foodService: FoodService, private apiService: ApiService, public dialog: MatDialog, private dynamodbService: DynamoDBService, private itemService: ItemsService) {

  }

  editDialog(item: Item): void {
    const dialogRef = this.dialog.open(LiveFormDialogComponent, {
      data: item,
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

  openDialog(): void {
    const dialogRef = this.dialog.open(LiveFormDialogComponent, {
      data: this.updatedData,
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

  ngOnInit(): void {
    this.foods = this.foodService.getAll();

    this.search();
  }


  search() {
    this.items$ = this.dynamodbService.getItems(this.query);
  }



  deleteItem(itemId: string) {

    // Aqui você pode adicionar a lógica para abrir um modal ou preencher um formulário com os dados do item selecionado para edição
    // Em seguida, você pode chamar o serviço para atualizar o item no DynamoDB
    this.updatedData.ID = itemId;
    this.itemService.deleteItem(this.updatedData).subscribe(response => {
      console.log(response);
      // Aqui você pode adicionar a lógica para atualizar a lista de itens exibidos na tabela
    });

    this.search();
  }






  callAPI() {
    this.ID = Date.now()
    this.apiService.salvar(this.ID, this.liner, this.tripcost, this.freetime, this.fsperiod, this.scperiod, this.tdperiod, this.comentario).subscribe(response => {
    }, error => {
      console.log(error);
    });
  }
}
