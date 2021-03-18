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
    name: 'My Meal',
    items: []
  };

  constructor() { }

  ngOnInit(): void {
  }

}
