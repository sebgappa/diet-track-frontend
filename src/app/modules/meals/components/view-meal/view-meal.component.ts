import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { IMeal } from 'src/app/models/meal.model';

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.scss']
})
export class ViewMealComponent implements OnInit {

  public labels: Label[] = ['Protein', 'Fats', 'Carbs'];
  public type: ChartType = 'doughnut';
  public data = [10, 10, 10];
  public options: ChartOptions = {
    legend: {
      display: false
    }
  };

  public meal: IMeal = {
    name: "My Meal",
    items: [{
      protein: 65,
      fat: 43,
      carbs: 12,
      calories: 435,
      name: "first food item",
      brand: "tesco",
      serving: 200,
      servingtype: "g"
    },
    {
      protein: 76,
      fat: 45,
      carbs: 35,
      calories: 654,
      name: "second food item",
      brand: "morrisons",
      serving: 100,
      servingtype: "ml"
    },
    {
      protein: 43,
      fat: 65,
      carbs: 23,
      calories: 754,
      name: "third food item",
      brand: "sainsbury's",
      serving: 150,
      servingtype: "kg"
    }]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
