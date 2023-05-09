import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/contratos/contratos.service';

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

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,

  ) {}

  callAPI() {
    this.ID = Date.now()
    this.apiService.callAPI(this.ID,this.liner, this.tripcost,this.freetime,this.fsperiod,this.scperiod,this.tdperiod, this.comentario).subscribe(response => {
      console.log(response.body);
      alert(response.body)
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

