import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
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
  barChart!: Chart;
  items!: any[];
  containers: any[] = [];
  weekCounts: { [key: string]: number } = {};
  monthCounts: { [key: string]: number } = {};

  constructor(
    private apiService: ApiService,
  ) { }



  ngOnInit() {
    // Registrando o módulo de empilhamento de gráficos

    Chart.register(...registerables);


    this.createPieChart();
    this.createLineChart();
    this.createCostCompositionChart();
    this.getItemsFromPipe();



  }
  getItemsFromPipe(): void {
    const monthCounts: { [key: string]: number } = {};
    const filtro = '';
    this.apiService.getItems(this.queryPipe, this.urlConsulta, filtro).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          try {
            const items = JSON.parse(response.body);
            if (Array.isArray(items)) {
              this.items = items.map(item => ({ ...item, checked: false }));
              // Adiciona a chave 'checked' a cada item, com valor inicial como false
              this.containers = this.items.map(item => item.ATA);
              console.log(this.containers); // Exibe o valor de this.containers no console


              this.containers.forEach(dateString => {
                const [day, month, year] = dateString.split('/');
                const date = new Date(Number(year), Number(month) - 1, Number(day)); // Ajusta o mês subtraindo 1, pois em JavaScript os meses são indexados a partir de 0

                const weekNumber = this.getWeekNumber(date);
                const monthName = this.getMonthName(date);

                // Contar datas por semana
                if (this.weekCounts[weekNumber]) {
                  this.weekCounts[weekNumber]++;
                } else {
                  this.weekCounts[weekNumber] = 1;
                }

                // Contar datas por mês
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
    // Cálculo do intervalo em meses
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const intervalo = Math.floor(diffDays / 30);

    // Lógica para atualizar o gráfico com base no intervalo de datas selecionado
    this.createBarChart(intervalo);
  }

  createBarChart(intervalo: number) {

    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    let labels: string[] = [];
    let data: number[] = [];
    if (this.barChart) {
      this.barChart.destroy();
    }

    if (intervalo < 1) {
      // Intervalo inferior a 1 mês (por semana)
  labels = this.getWeekLabels(startDate, endDate);
  data = labels.map(weekLabel => {
    const weekNumber = parseInt(weekLabel.split(' ')[1]);
    return this.weekCounts[weekNumber] || 0;
  });
    } else {
      // Intervalo superior a 1 mês (por mês)
      labels = this.getMonthLabels(startDate, endDate);
      data = labels.map(monthLabel => this.monthCounts[monthLabel] || 0);
    }

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quantity of container arrival on Harbor',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getWeekLabels(startDate: Date, endDate: Date): string[] {
    const labels: string[] = [];
    const oneDay = 24 * 60 * 60 * 1000; // Milissegundos em um dia
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const weekNumber = this.getWeekNumber(currentDate);
      labels.push(`Semana ${weekNumber}`);
      currentDate = new Date(currentDate.getTime() + 7 * oneDay); // Adicionar 7 dias
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
      currentDate.setMonth(currentDate.getMonth() + 1); // Adicionar 1 mês
    }

    return labels;
  }

  getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
  }


  getMonthName(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long' }; // Define o formato do nome do mês
    return date.toLocaleDateString('pt-BR', options); // Retorna o nome do mês no formato desejado
  }


  createPieChart() {
    const pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['20 pés', '40 pés', 'Reefer'],
        datasets: [{
          label: 'Distribuição de Tipos de Containers',
          data: [35, 45, 20],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  createLineChart() {
    const lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
          label: 'Quantidade de Containers Recebidos',
          data: [100, 150, 120, 180, 200, 170],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Quantidade de Containers Despachados',
          data: [80, 120, 100, 140, 160, 130],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  createCostCompositionChart() {
    const data = [5000, 3000, 2000, 4000, 2500, 1500];
    const totalCost = data.reduce((total, cost) => total + cost, 0);

    const costCompositionChart = new Chart('costCompositionChart', {
      type: 'bar',
      data: {
        labels: ['Frete', 'Manuseio', 'Clean', 'Transporte', 'Armazenamento', 'Demurrage', 'Total'],
        datasets: [{
          label: 'Custo Total',
          data: [...data, totalCost],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(75, 192, 192, 0.8)'
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: totalCost + 1000 // Aumente o limite máximo do eixo y para acomodar a barra total
          }
        }
      }
    });
  }

}
