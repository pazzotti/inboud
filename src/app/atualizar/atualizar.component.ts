import { CarregaService } from '../services/carrega_file/carrega.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { format, parse, differenceInDays } from 'date-fns';
import { DynamoDBService } from '../services/contratos/consulta.service';
import { map, take } from 'rxjs/operators';
import { formatDate } from '@angular/common';



@Component({
  selector: 'atualizar-root',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent {

  @ViewChild('downloadLink') downloadLink!: ElementRef<HTMLAnchorElement>;
  query: string = '';
  items$ = this.consultaContrato.getItems(this.query);
  dataLoaded = false;
  jsonData: any;
  sortColumn: string = '';
  sortDirection: number = 1;
  dias_terminal: Date = new Date();
  Freetime: number = 0;
  dados: any[] = [];
  contratos: string[] = [];
  freetime: string[] = [];
  tripcost: string[] = [];
  custoViagem: string = "";
  handling: string[] = [];
  manuseio: string = "";
  demurrage: string[] = [];
  estadia: string = "";
  valorFree: string = '';
  liner: string = "";
  custoestadia: number = 0;




  constructor(
    private carregaService: CarregaService,
    private http: HttpClient,
    private consultaContrato: DynamoDBService,

  ) { }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    const rawData = await this.carregaService.loadFile(fileUrl);
    const inflatedData = this.inflateData(rawData); // Inflar os campos desejados



    this.jsonData = inflatedData;
    this.dataLoaded = true;
    // Chama a função para salvar os dados no API Gateway
    this.saveDataToAPIGateway(inflatedData);
  }


  ngOnInit() {

    const key = 'liner'; // Substitua 'propriedade' pelo nome da propriedade que você deseja obter

    this.items$.pipe(
      map(array => array.map(contratinho => contratinho[key])), // Obtém a propriedade desejada de cada item
    ).subscribe((values) => {
      this.contratos = values;
      console.log(this.contratos); // Valores da propriedade específica no array
    });

    this.items$.pipe(
      map(array => array.map(contratinho => contratinho['freetime'])), // Obtém a propriedade desejada de cada item
    ).subscribe((values) => {
      this.freetime = values;
      console.log(this.freetime); // Valores da propriedade específica no array
    });

    this.items$.pipe(
      map(array => array.map(custoviagem => custoviagem['tripcost'])), // Obtém a propriedade desejada de cada item
    ).subscribe((values) => {
      this.tripcost = values;
      console.log(this.tripcost); // Valores da propriedade específica no array
    });

    this.items$.pipe(
      map(array => array.map(manuseio => manuseio['fsperiod'])), // Obtém a propriedade desejada de cada item
    ).subscribe((values) => {
      this.handling = values;
      console.log(this.handling); // Valores da propriedade específica no array
    });
    this.items$.pipe(
      map(array => array.map(estadia => estadia['scperiod'])), // Obtém a propriedade desejada de cada item
    ).subscribe((values) => {
      this.demurrage = values;
      console.log(this.demurrage); // Valores da propriedade específica no array
    });


  }


  inflateData(rawData: any[]): any[] {

    return rawData.map((item: any) => {



      const today = new Date(); // Obter a data atual
      const ataDate = parse(item['ATA'], 'dd/MM/yyyy', new Date()); // Converter a data de string para objeto Date

      const diffInDays = differenceInDays(today, ataDate); // Calcular a diferença em dias
      let i = 0;
      while (i < this.freetime.length) {

        if (item['Liner'] === this.contratos[i]) {
          this.valorFree = this.freetime[i];
          this.custoViagem = this.tripcost[i];
          this.manuseio = this.handling[i];
          this.estadia = this.demurrage[i];
        }
        i = i + 1;

      }
      this.Freetime = +this.valorFree - diffInDays; //calculo o numero de dias de freetime

      if (this.Freetime < 0) {
        this.custoestadia = +this.estadia * this.Freetime
      }else{
        this.custoestadia = 0;
      }
      if (this.custoestadia < 0) {
        this.custoestadia = this.custoestadia * (-1);
      }

      const inflatedItem: any = {


        'Process': item['Process'],
        'Container': item['Container'],
        'Channel': item['Channel'],
        'Step': item['Step'],
        'Transport': item['Transport'],
        'Invoice': item['Invoice'],
        'Liner': item['Liner'],
        'ATA': item['ATA'],
        'Dias': diffInDays,
        'FreeTime': this.Freetime,
        'TripCost': this.custoViagem,
        'Handling': this.manuseio,
        'Demurrage': this.custoestadia

        // Adicione mais campos conforme necessário
      };

      console.log(this.freetime);



      return inflatedItem;
    });
  }




  async saveDataToAPIGateway(data: any[]) {
    try {
      const apiUrl = 'https://weskqpmdre.execute-api.sa-east-1.amazonaws.com/dev5'; // Substitua pela URL do seu API Gateway





      const dataWithId = data.map((item: any) => {

        // Gerar um ID aleatório com base nos critérios do objeto

        var ATA = item['ATA'].replace(/\//g, '');
        const ID = item['Invoice']

        // Obtenha a data atual


        const today = new Date();


        const formattedDate = formatDate(today, 'dd/MM/yyyy', 'en-US');





        // Adicionar o ID gerado ao objeto

        return { ID, formattedDate, ...item };
      });

      const batchSize = 10; // Tamanho máximo de cada lote

      // Dividir os dados em lotes menores
      const batches = [];
      for (let i = 0; i < dataWithId.length; i += batchSize) {
        const batch = dataWithId.slice(i, i + batchSize);
        batches.push(batch);
      }

      // Enviar cada lote separadamente para a API
      for (const batch of batches) {
        const jsonDataString = JSON.stringify(batch, null, 2);
        const blob = new Blob([jsonDataString], { type: 'application/json' });

        const downloadUrl = URL.createObjectURL(blob);
        this.downloadLink.nativeElement.href = downloadUrl;
        this.downloadLink.nativeElement.download = 'dados.json';
        this.downloadLink.nativeElement.click();

        try {
          const response = await this.http.post(apiUrl, batch).toPromise();
          console.log('Dados do lote salvos com sucesso no DynamoDB através do API Gateway!');
        } catch (error) {
          console.error('Erro ao salvar dados do lote no DynamoDB através do API Gateway:', error);
        }
      }

      console.log('Todos os dados foram salvos com sucesso no DynamoDB através do API Gateway!');
    } catch (error) {
      console.error('Erro ao salvar dados no DynamoDB através do API Gateway:', error);
    }
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
    this.jsonData.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
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
