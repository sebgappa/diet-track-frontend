import { Component, OnInit } from '@angular/core';
import { faAppleAlt, faDrumstickBite, faEgg, faHotdog } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.scss']
})
export class CaloriesComponent implements OnInit {
  public labels: Label[] = ['Lunch', 'Dinner', 'Snacks', 'Breakfast']; 
  public type: ChartType = 'pie';
  public data = [10, 10, 10, 10];
  public options: ChartOptions = {
    legend: {
      display: false
    }
  }


  public breakfastIcon = faEgg;
  public lunchIcon = faHotdog;
  public dinnerIcon = faDrumstickBite;
  public snacksIcon = faAppleAlt

  private breakfastPercentage;
  private lunchPercentage;
  private dinnerPercentage;
  private snacksPercentage;
  
  private breakfastTotalCal;
  private lunchTotalCal;
  private dinnerTotalCal;
  private snacksTotalCal;

  
  constructor() {
  }

  ngOnInit(): void {
    this.breakfastPercentage = 10;
    this.lunchPercentage = 10;
    this.dinnerPercentage = 10;
    this.snacksPercentage = 10;
    
    this.breakfastTotalCal = 10;
    this.lunchTotalCal = 10;
    this.dinnerTotalCal = 10;
    this.snacksTotalCal = 10;

    // this.labels = [
    // `Breakfast ${this.breakfastPercentage}% (${this.breakfastTotalCal} cal)`, 
    // `Lunch ${this.lunchPercentage}% (${this.lunchTotalCal} cal)`, 
    // `Dinner ${this.dinnerPercentage}% (${this.dinnerTotalCal} cal)`, 
    // `Snacks ${this.snacksPercentage}% (${this.snacksTotalCal} cal)`
    // ];
  }
}
