import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    // Registrando os módulos necessários
    Chart.register(...registerables);

    this.createContainerStatusChart();
    this.createContainerTypeChart();
    this.createContainerMovementChart();
  }

  createContainerStatusChart() {
    const containerStatusChart = new Chart('containerStatusChart', {
      type: 'bar',
      data: {
        labels: ['Em Trânsito', 'Em Armazenamento', 'Entregue'],
        datasets: [{
          label: 'Status dos Containers',
          data: [80, 50, 120],
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 150
          }
        }
      }
    });
  }

  createContainerTypeChart() {
    const containerTypeChart = new Chart('containerTypeChart', {
      type: 'pie',
      data: {
        labels: ['20 pés', '40 pés', 'Outros'],
        datasets: [{
          label: 'Tipos de Containers',
          data: [60, 30, 10],
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  createContainerMovementChart() {
    const containerMovementChart = new Chart('containerMovementChart', {
      type: 'line',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
          label: 'Movimentação de Containers',
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
}
