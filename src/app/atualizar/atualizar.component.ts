import { Component } from '@angular/core';
import { CarregaService } from '../services/carrega_file/carrega.service';

@Component({
  selector: 'atualizar-root',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent {

  dataLoaded = false;
  jsonData: any;

  constructor(private carregaService: CarregaService) {}

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    const data = await this.carregaService.loadFile(fileUrl);
    this.jsonData = data;
    this.dataLoaded = true;
  }

}
