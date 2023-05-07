import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  foods:Food[]=[];
  constructor(private foodService:FoodService){

  }

  ngOnInit():void{
    this.foods = this.foodService.getAll();
  }

  callAPI(){
    // instantiate a headers object
    var base = 10;
    var exponent = 2;
    const myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    const raw = JSON.stringify({"base":base,"exponent":exponent});
    // create a JSON object with parameters for API call and store in a variable
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://o7f7w3t8hj.execute-api.sa-east-1.amazonaws.com/dev")
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
    console.log()
  }

  save() {

  }

}
