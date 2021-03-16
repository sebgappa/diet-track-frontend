import { Component, OnInit } from '@angular/core';
import { faBreadSlice, faCheese, faDrumstickBite } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss']
})
export class MacrosComponent implements OnInit {
  public labels: Label[] = ['Protein', 'Fats', 'Carbs'];
  public type: ChartType = 'pie';
  public data = [10, 10, 10];

  public proteinIcon = faDrumstickBite;
  public fatsIcon = faCheese;
  public carbsIcon = faBreadSlice;

  public options: ChartOptions = {
    legend: {
      display: false
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
