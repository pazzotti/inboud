import { Injectable } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
    return[
      {
        id:1,
        name:'Pizza Pepperoni',
        cookTime: '10-20',
        price:10,
        favorite:false,
        origins:['italy'],
        stars:4.5,
        imageUrl:'assets/images/foods/food-1.jpg',
        tags:['FastFood', 'Pizza', 'Lunch']

      },
      {
        id:2,
        name:'Pizza Pepperoni',
        cookTime: '10-20',
        price:10,
        favorite:false,
        origins:['italy'],
        stars:4.5,
        imageUrl:'assets/images/foods/food-1.jpg',
        tags:['FastFood', 'Pizza', 'Lunch']

      }
    ]
  }
}
