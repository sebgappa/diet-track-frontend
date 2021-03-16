import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
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

  public labels: Label[] = ['Protein', 'Fats', 'Carbs'];
  public type: ChartType = 'doughnut';
  public data = [10, 10, 10];
  public options: ChartOptions = {
    legend: {
      display: false
    }
  };
  public servingSizes = ['1 Container', '100g', '1g'];
  public foodObject: IFood = {
    protein: 123,
    fat: 123,
    carbs: 123,
    calories: 123,
    name: 'King Pot Noodle',
    brand: 'test'
  };
  public tickIcon = faCheck;
  public get nutritionForm() { return this.nutritionBreakdownForm.controls; }
  public nutritionBreakdownForm: FormGroup;

  private unsubscribe: Subject<void> = new Subject();
  private barcode: number;

  constructor(private foodService: FoodService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.nutritionBreakdownForm = this.formBuilder.group({
      servingSize: [null, Validators.required],
      numOfServings: [null, Validators.required]
    });

    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        if (params.has('id')) {
          this.barcode = Number.parseInt(params.get('id'), 10);
        }
      });

    this.foodService.getFood(this.barcode).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      this.data = [response.protein, response.fat, response.carbs];
    }, () => {
      console.log('No response');
    });
  }

  public addFoodItem() {
    console.log('Here!');
  }

}
