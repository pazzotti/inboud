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
  base: number = 10;
  exponent: number = 5;
  constructor(private foodService:FoodService, private apiService: ApiService){

  }

  ngOnInit():void{
    this.foods = this.foodService.getAll();

  }

  callApi(base: number, exponent: number): void {
    this.apiService.callAPI(base, exponent);
  }

}
