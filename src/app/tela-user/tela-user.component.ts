import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/contratos/edita_dynamo.service';
import { TelaUserModule } from './tela-user.module';
import { CommonModule } from '@angular/common'
import { isToday } from 'date-fns';



@Component({
  selector: 'app-tela-user',
  templateUrl: './tela-user.component.html',
  styleUrls: ['./tela-user.component.css']
})
export class TelaUserComponent implements OnInit {
  items: any[] = [];
  sortColumn: string = '';
  sortDirection: number = 1;
  dataLoaded = true;
  filtroDataInicio: Date = new Date();
  filtroDataTermino: Date = new Date();
  itemsFiltrados: any[] = [];

  constructor(private dynamoDBService: ItemsService) { }

  ngOnInit(): void {
    this.getItemsFromDynamoDB();
    this.calcularSomaDemurrage();
  }

  converterData(stringData: string): string {
    const partes = stringData.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];

    return `${ano}-${mes}-${dia}`;
  }

  aplicarFiltroPorData(): void {
    if (this.filtroDataInicio && this.filtroDataTermino) {
      const filtroInicio = new Date(this.filtroDataInicio);
      const filtroTermino = new Date(this.filtroDataTermino);

      this.itemsFiltrados = this.items.filter(item => {
        const dataFormatada = this.converterData(item.ATA);
        const dataItem = new Date(dataFormatada);

        return dataItem >= filtroInicio && dataItem <= filtroTermino;
      });
    } else {
      this.itemsFiltrados = this.items;
    }
  }



  calcularSomaTrip(): number {
    return this.itemsFiltrados.reduce((sum, item) => sum + Number(item.TripCost), 0);
  }
  calcularSomaHandling(): number {
    return this.itemsFiltrados.reduce((sum, item) => sum + Number(item.Handling), 0);
  }
  calcularSomaDemurrage(): number {
    return this.itemsFiltrados.reduce((sum, item) => sum + Number(item.Demurrage), 0);
  }




  getItemsFromDynamoDB(): void {
    const query = 'SELECT * FROM ID';
    this.dynamoDBService.getItems(query).subscribe(
      (items: any[]) => {
        this.items = items;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      // Reverse the sort direction
      this.sortDirection *= -1;
    } else {
      // Set the new sort column and reset the sort direction
      this.sortColumn = column;
      this.sortDirection = 1;
    }

    // Sort the data array based on the selected column and direction
    this.itemsFiltrados.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];

      if (valueA < valueB) {
        return -1 * this.sortDirection;
      } else if (valueA > valueB) {
        return 1 * this.sortDirection;
      } else {
        return 0;
      }
    });
  }




}

