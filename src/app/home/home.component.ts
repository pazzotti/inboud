import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';
import { ApiService } from '../services/contratos/contratos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  foods:Food[]=[];
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
  constructor(private foodService:FoodService, private apiService: ApiService){

  }

  ngOnInit():void{
    this.foods = this.foodService.getAll();

  }


  callAPI() {
    this.ID = Date.now()
    this.apiService.callAPI(this.ID,this.liner, this.tripcost,this.freetime,this.fsperiod,this.scperiod,this.tdperiod, this.comentario).subscribe(response => {
      console.log(response.body);
      alert(response.body)
    }, error => {
      console.log(error);
    });
  }
}
