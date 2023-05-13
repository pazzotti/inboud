import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/contratos/contratos.service';
import { ItemsService } from 'src/app/services/contratos/edita_dynamo.service';
import { Item } from 'src/app/services/contratos/itens_contrato.model';


@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent {

  base: number = 3;
  ID:number=Date.now();
  liner:string = "";
  tripcost:number = 0;
  freetime:number=0;
  fsperiod:number=0;
  scperiod:number=0;
  tdperiod:number=0;
  comentario: string = "";
  exponent: number = 22;
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

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
    private itemService: ItemsService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  salvar() {
    this.ID = Date.now()
    if (this.data.ID == ""){
      this.data.ID = this.ID;
    }
    this.apiService.salvar(this.data.ID,this.data.liner, this.data.tripcost,this.data.freetime,this.data.fsperiod,this.data.scperiod,this.data.tdperiod, this.data.comentario).subscribe(response => {

    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  editItem(itemId: string) {

    // Aqui você pode adicionar a lógica para abrir um modal ou preencher um formulário com os dados do item selecionado para edição
    // Em seguida, você pode chamar o serviço para atualizar o item no DynamoDB
    this.updatedData.ID = itemId;
    this.itemService.updateItem(itemId, this.updatedData).subscribe(response => {
      console.log(response);
      // Aqui você pode adicionar a lógica para atualizar a lista de itens exibidos na tabela
    });
  }
}

