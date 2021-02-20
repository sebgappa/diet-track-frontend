import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {

  public labels = ['Protein', 'Carbs', 'Fats'];
  public data = [120, 150, 180];
  public type = 'doughnut';
}
