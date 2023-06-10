import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/contratos/contratos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urlAtualiza: string = 'https://uj88w4ga9i.execute-api.sa-east-1.amazonaws.com/dev12';
  urlConsulta: string = 'https://4i6nb2mb07.execute-api.sa-east-1.amazonaws.com/dev13';
  queryOrigin: string = 'Locais_Origem_Inbound';
  queryDestiny: string = 'Locais_Destino_Inbound';
  queryCarrier: string = 'Carriers';
  queryTransport: string = 'Transportadoras_Inbound';
  queryPipe: string = 'Pipeline_Inbound';
  startDate!: string;
  endDate!: string;
  items!: any[];
  containers: any[] = [];
  weekCounts: { [key: string]: number } = {};
  monthCounts: { [key: string]: number } = {};

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.createPieChart();
    this.createLineChart();
    this.createCostCompositionChart();
    this.getItemsFromPipe();
  }

  getItemsFromPipe(): void {
    const filtro = '';
    this.apiService.getItems(this.queryPipe, this.urlConsulta, filtro).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          try {
            const items = JSON.parse(response.body);
            if (Array.isArray(items)) {
              this.items = items.map(item => ({ ...item, checked: false }));
              this.containers = this.items.map(item => item.ATA);
              console.log(this.containers);

              this.containers.forEach(dateString => {
                const [day, month, year] = dateString.split('/');
                const date = new Date(Number(year), Number(month) - 1, Number(day));
                const weekNumber = this.getWeekNumber(date);
                const monthName = this.getMonthName(date);

                if (this.weekCounts[weekNumber]) {
                  this.weekCounts[weekNumber]++;
                } else {
                  this.weekCounts[weekNumber] = 1;
                }

                if (this.monthCounts[monthName]) {
                  this.monthCounts[monthName]++;
                } else {
                  this.monthCounts[monthName] = 1;
                }
              });

              console.log('Datas por semana:', this.weekCounts);
              console.log('Datas por mês:', this.monthCounts);
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

  onDateChange() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const intervalo = Math.floor(diffDays / 30);

    this.createBarChart(intervalo);
  }

  createBarChart(intervalo: number) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    let labels: string[] = [];
    let data: number[] = [];

    if (intervalo < 1) {
      labels = this.getWeekLabels(startDate, endDate);
      data = labels.map(weekLabel => {
        const weekNumber = parseInt(weekLabel.split(' ')[1]);
        return this.weekCounts[weekNumber] || 0;
      });
    } else {
      labels = this.getMonthLabels(startDate, endDate);
      data = labels.map(monthLabel => this.monthCounts[monthLabel] || 0);
    }

    // Seu código para criar o gráfico de barras com os dados (labels e data)
  }

  getWeekLabels(startDate: Date, endDate: Date): string[] {
    const labels: string[] = [];
    const oneDay = 24 * 60 * 60 * 1000;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const weekNumber = this.getWeekNumber(currentDate);
      labels.push(`Semana ${weekNumber}`);
      currentDate = new Date(currentDate.getTime() + 7 * oneDay);
    }

    return labels;
  }

  getMonthLabels(startDate: Date, endDate: Date): string[] {
    const labels: string[] = [];
    let currentDate = new Date(startDate);
    const endDateMonth = endDate.getMonth();

    while (currentDate.getMonth() <= endDateMonth) {
      const monthName = this.getMonthName(currentDate);
      labels.push(monthName);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return labels;
  }

  getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
  }

  getMonthName(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    return date.toLocaleDateString('pt-BR', options);
  }

  createPieChart() {
    // Seu código para criar o gráfico de pizza
  }

  createLineChart() {
    // Seu código para criar o gráfico de linha
  }

  createCostCompositionChart() {
    // Seu código para criar o gráfico de barras de composição de custos
  }
}
