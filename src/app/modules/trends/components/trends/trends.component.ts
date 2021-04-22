import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  public macronutrientChartData: ChartDataSets[] = [
    { data: [80, 78, 83, 88, 65, 66, 70], label: 'Protein', fill: false },
    { data: [60, 80, 77, 70, 72, 65, 76], label: 'Fat', fill: false },
    { data: [200, 180, 230, 200, 190, 175, 166], label: 'Carbs', fill: false }
  ];

  public calorieChartData: ChartDataSets[] = [
    { data: [2400, 2600, 1800, 2600, 2400, 2500, 2500], label: 'Calories' }
  ];

  public reviewChartData: ChartDataSets[] = [
    { data: [5, 5, 5, 4, 4, 3, 5], label: 'Mood', fill: false },
    { data: [3, 4, 4, 2, 4, 5, 5], label: 'Appetite', fill: false },
    { data: [3, 3, 3, 2, 4, 4, 5], label: 'Energy', fill: false }
  ];

  public macronutrientChartColors: Color[] = [
    {
      borderColor: 'red',
    },
  ];

  public calorieChartColors: Color[] = [
    {
      borderColor: '#6C08D0',
      backgroundColor: '#9E51EB',
    },
  ];

  public reviewChartColors: Color[] = [
    {
      borderColor: '#3CC0DB',
    },
    {
      borderColor: 'green',
    },
    {
      borderColor: '#DB4900',
    }
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public lineChartLabels: Label[] = ['10/04/21', '11/04/21', '12/04/21', '13/04/21', '14/04/21', '15/04/21', '16/04/21'];

  constructor() { }

  ngOnInit(): void {
  }

}
