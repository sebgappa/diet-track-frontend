import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFood } from '../../models/food.model';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html',
  styleUrls: ['./breakdown.component.scss']
})
export class BreakdownComponent implements OnInit {

  public labels: Label[] = ['Protein', 'Carbs', 'Fats'];
  public data;
  public type: ChartType = 'doughnut';

  private unsubscribe: Subject<void> = new Subject();
  private barcode: number;

  constructor(private foodService: FoodService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        if (params.has('id')) {
          this.barcode = Number.parseInt(params.get('id'), 10);
        }
      });

    this.foodService.getFood(this.barcode, 1, 25).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      this.data = response.data;
    }, () => {
      console.log("No response");
    })
  }

}
