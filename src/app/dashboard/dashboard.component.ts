import { Component, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-meu-componente',
  template: '<div id="meuGrafico" style="width: 600px; height: 400px;"></div>',
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    const myChart = echarts.init(document.getElementById('meuGrafico')!);

    // Configuração do gráfico
    const options = {
      title: {
        text: 'Exemplo de Gráfico ECharts',
      },
      xAxis: {
        data: ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5'],
      },
      yAxis: {},
      series: [
        {
          name: 'Valores',
          type: 'bar',
          data: [5, 20, 36, 10, 10],
        },
      ],
    };

    // Aplicar a configuração ao gráfico
    myChart.setOption(options);
  }
}
