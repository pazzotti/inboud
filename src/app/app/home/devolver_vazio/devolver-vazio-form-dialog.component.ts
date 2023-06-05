import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/contratos/contratos.service';
import { format } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devolver-vazio-form-dialog',
  templateUrl: './devolver-vazio-form-dialog.component.html',
  styleUrls: ['./devolver-vazio-form-dialog.component.css']
})
export class DevolverVazioFormDialogComponent {

  base: number = 3;
  ID: number = Date.now();
  local: string = "";
  contato: string = "";
  exponent: number = 22;
  dataSource: any;
  urlAtualiza: string = 'https://uj88w4ga9i.execute-api.sa-east-1.amazonaws.com/dev12';
  query: string = 'Contratos_Terminais_Inbound';
  formGroup!: FormGroup;
  formattedDate: string = '';



  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<DevolverVazioFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ATA: [this.data.itemsData.ATA, Validators.required],
    });
  }

  salvar() {

          this.data.itemsData = {
            "ID": this.data.itemsData.ID,
            "harborname": this.formGroup.get('harborname')?.value,

        }
          this.data.itemsData.tableName = this.query
          const itemsDataString = JSON.stringify(this.data.itemsData); // Acessa a string desejada
          const modifiedString = itemsDataString.replace(/\\"/g, '"'); // Realiza a substituição na string
          const jsonObject = JSON.parse(modifiedString) as { [key: string]: string };
          const modifiedJsonString = JSON.stringify(jsonObject);
          const jsonObject2 = JSON.parse(modifiedJsonString) as { tableName: string, ID: string, acao: string };
          const jsonArray = [jsonObject2];
          this.apiService.salvar(jsonArray, this.query, this.urlAtualiza).subscribe(response => {
          }, error => {
            console.log(error);
          });
          this.dialogRef.close('resultado do diálogo');



    }

  cancel(): void {
    this.dialogRef.close();
  }

}



