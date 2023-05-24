import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/contratos/edita_dynamo.service';
import { TelaUserModule } from './tela-user.module';
import { CommonModule } from '@angular/common'
import { isToday } from 'date-fns';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';



@Component({
  selector: 'app-tela-user',
  templateUrl: './tela-user.component.html',
  styleUrls: ['./tela-user.component.css']
})
export class TelaUserComponent implements OnInit {
  items: any[] = [];
  sortColumn: string = '';
  sortNumber: number = 0;
  sortDirection: number = 1;
  dataLoaded = true;
  filtroDataInicio: Date = new Date();
  filtroDataTermino: Date = new Date();
  searchText: string='';
  items2: any[] = [ /* Seus itens aqui */ ];
  private searchTextSubject = new Subject<string>();
  private searchTextSubscription!: Subscription;
  somaDemurrage: number=0;
  SomaTrip:number=0;
  SomaHandling:number=0;
  hideCheckColumn: boolean = true;
  itemsFiltrados: any[] = [];
  todosSelecionados: boolean = false;


  constructor(private dynamoDBService: ItemsService) { }

  ngOnInit() {

    this.searchTextSubscription = this.searchTextSubject.pipe(debounceTime(300)).subscribe(() => {
      this.filterItems();
    });
    this.getItemsFromDynamoDB();
    this.calcularSomaDemurrage();

  }

  selecionarTodos() {
    this.todosSelecionados = !this.todosSelecionados;
    for (let item of this.itemsFiltrados) {
      item.checked = this.todosSelecionados;
    }
    this.calcularSomaDemurrage();
  }

  ngOnDestroy() {
    this.searchTextSubscription.unsubscribe();
  }

  converterData(stringData: string): string {
    const partes = stringData.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];

    return `${ano}-${mes}-${dia}`;
  }

toggleColumn() {
  this.hideCheckColumn = !this.hideCheckColumn;
}


  calcularSomaDemurrage() {
    this.somaDemurrage = 0;
    this.SomaTrip = 0;
    this.SomaHandling = 0;

    for (let item of this.itemsFiltrados) {
      if (item.checked) {
        this.somaDemurrage += Number(item.Demurrage);
        this.SomaTrip += Number(item.TripCost);
        this.SomaHandling += Number(item.Handling);
      }
    }
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
  sortBy2(column: string) {
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
      const valueA = parseFloat(a[this.sortColumn]);
      const valueB = parseFloat(b[this.sortColumn]);

      if (valueA < valueB) {
        return -1 * this.sortDirection;
      } else if (valueA > valueB) {
        return 1 * this.sortDirection;
      } else {
        return 0;
      }
    });
  }
  sortByDate(column: string) {
    if (this.sortColumn === column) {
      // Inverte a direção da ordenação
      this.sortDirection *= -1;
    } else {
      // Define a nova coluna de ordenação e redefine a direção da ordenação
      this.sortColumn = column;
      this.sortDirection = 1;
    }

    // Sort the data array based on the selected column and direction
    this.itemsFiltrados.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
      const dateA = this.parseDate(a[this.sortColumn]);
      const dateB = this.parseDate(b[this.sortColumn]);

      if (dateA < dateB) {
        return -1 * this.sortDirection;
      } else if (dateA > dateB) {
        return 1 * this.sortDirection;
      } else {
        return 0;
      }
    });
  }

  parseDate(dateString: string): Date {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }


  filterItems() {
    const searchText = this.searchText.toLowerCase();
    this.itemsFiltrados = this.items.filter(item => {

      // Implemente a lógica de filtragem com base no seu HTML
      // Por exemplo, se seus itens tiverem uma propriedade 'Process':
      return item.Process.toLowerCase().includes(searchText)
        || item.Invoice.toLowerCase().includes(searchText)
        || item.Container.toLowerCase().includes(searchText)
        || item.Step.toLowerCase().includes(searchText)
        || item.Liner.toLowerCase().includes(searchText)
        || item.Channel.toLowerCase().includes(searchText)
        || item.ATA.toLowerCase().includes(searchText)
        || item.Dias.toLowerCase().includes(searchText)
        || item.FreeTime.toLowerCase().includes(searchText)
        || item.TripCost.toLowerCase().includes(searchText)
        || item.Handling.toLowerCase().includes(searchText)
        || item.Demurrage.toLowerCase().includes(searchText);
    });
  }

  onSearchTextChanged() {
    this.searchTextSubject.next(this.searchText);
  }

}









