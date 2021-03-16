import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFood } from 'src/app/models/food.model';
import { IMeal } from 'src/app/models/meal.model';
import { FoodService } from 'src/app/services/food/food.service';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html',
  styleUrls: ['./breakdown.component.scss']
})
export class BreakdownComponent implements OnInit {

  public forMeal: boolean = false;

  public tickIcon = faCheck;

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
    brand: 'test',
    serving: 150,
    servingtype: "g"
  };

  public get nutritionForm() { return this.nutritionBreakdownForm.controls; }
  public nutritionBreakdownForm: FormGroup;

  public meal:string;

  private unsubscribe: Subject<void> = new Subject();
  private barcode: number;

  constructor(
    private foodService: FoodService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.router.url.includes('/new')) {
      this.forMeal = true;
    }

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
        if (params.has('meal')) {
          this.meal = params.get('meal');
        }
      });

    this.foodService.getFood(this.barcode).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      this.data = [response.protein, response.fat, response.carbs];
    }, () => {
      console.log('No response');
    });
  }

  public addFoodItem() {
    if(this.forMeal){
      this.addFoodItemForMeal();
      return;
    }

    console.log('Here!');
  }

  public addFoodItemForMeal() {
    this.sessionStorageService.saveFoodItemToMeal(this.foodObject);
    this.toastr.success("Iteam added");
    this.router.navigate(['/food/', this.meal])
  }

}
