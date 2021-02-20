import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent {

  public labels: Label[] = ['Protein', 'Carbs', 'Fats'];
  public data = [120, 150, 180];
  public type: ChartType = 'doughnut';
}
