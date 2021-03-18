import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MacroNutrients } from 'src/app/enums/macronutrients.enum';
import { IFood } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food/food.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
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

  public servingSizes = [100, 10, 1];
  public foodObject: IFood;

  public macronutrients: number[] = [];
  public originalMacronutrients: number[] = [];
  public macronutrientGoalPercentages: number[] = [];

  public get nutritionForm() { return this.nutritionBreakdownForm.controls; }
  public nutritionBreakdownForm: FormGroup;

  public meal:string;

  private unsubscribe: Subject<void> = new Subject();
  private barcode: number;
  
  private currentServingSizeSelection: string;

  constructor(
    private foodService: FoodService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private goalService: GoalsService) { }

  ngOnInit(): void {
    if(this.router.url.includes('/new')) {
      this.forMeal = true;
    }

    this.nutritionBreakdownForm = this.formBuilder.group({
      servingSize: [100, Validators.required],
      numOfServings: [1, Validators.required]
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
      this.data = [response.product.nutriments.proteins_value, response.product.nutriments.fat_value, response.product.nutriments.carbohydrates_value];
      this.foodObject = response; 

      this.macronutrients = [this.foodObject.product.nutriments.proteins_100g, 
                            this.foodObject.product.nutriments.fat_100g,
                            this.foodObject.product.nutriments.carbohydrates_100g,
                            this.foodObject.product.nutriments['energy-kcal_100g']]

      this.originalMacronutrients = [this.foodObject.product.nutriments.proteins_100g, 
                                    this.foodObject.product.nutriments.fat_100g,
                                    this.foodObject.product.nutriments.carbohydrates_100g,
                                    this.foodObject.product.nutriments['energy-kcal_100g']];

      this.macronutrientGoalPercentages = [
        this.calculatePercentageOfMacronutrientGoal(response.product.nutriments.proteins_value, MacroNutrients.protein),
        this.calculatePercentageOfMacronutrientGoal(response.product.nutriments.fat_value, MacroNutrients.fat),
        this.calculatePercentageOfMacronutrientGoal(response.product.nutriments.carbohydrates_value, MacroNutrients.carbs),
        this.calculatePercentageOfMacronutrientGoal(response.product.nutriments['energy-kcal_100g'], MacroNutrients.calories)
      ];
    }, () => {
      console.log('No response');
    });

    this.currentServingSizeSelection = this.nutritionBreakdownForm.controls.servingSize.value;
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

  public calculatePercentageOfMacronutrientGoal(foodValue: number, goalValue: MacroNutrients) {
    return Math.round((foodValue/this.goalService.getMacroNutrientGoal(goalValue))*100);
  }

  public updateMacroServingSize() {
    switch(this.nutritionBreakdownForm.controls.servingSize.value) {
      case "100":
        if(this.currentServingSizeSelection == "100") return;
        else if(this.currentServingSizeSelection == "10") {
          for(let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i]*10).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i)
            if(this.macronutrientGoalPercentages[i] > 100) this.macronutrientGoalPercentages[i] = 100;

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i]*10).toFixed(4));
          }

          this.currentServingSizeSelection = "100";
          break;
        } else {
          for(let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i]*100).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i)
            if(this.macronutrientGoalPercentages[i] > 100) this.macronutrientGoalPercentages[i] = 100;

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i]*100).toFixed(4));
          }
          
          this.currentServingSizeSelection = "100";
          break;
        }
      case "10":
        if(this.currentServingSizeSelection == "10") return;
        else if(this.currentServingSizeSelection == "100") {
          for(let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i]/10).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i)
            if(this.macronutrientGoalPercentages[i] > 100) this.macronutrientGoalPercentages[i] = 100;

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i]/10).toFixed(4));
          }

          this.currentServingSizeSelection = "10";
          break;
        }
        else {
          for(let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i]*10).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i)
            if(this.macronutrientGoalPercentages[i] > 100) this.macronutrientGoalPercentages[i] = 100;

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i]*10).toFixed(4));
          }

          this.currentServingSizeSelection = "10";
          break;
        }
      case "1":
        if(this.currentServingSizeSelection == "1") return;
        else if(this.currentServingSizeSelection == "10") {
          for(let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i]/10).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i)
            if(this.macronutrientGoalPercentages[i] > 100) this.macronutrientGoalPercentages[i] = 100;

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i]/10).toFixed(4));
          }

          this.currentServingSizeSelection = "1";
          break;
        } else {
          for(let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i]/100).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i)
            if(this.macronutrientGoalPercentages[i] > 100) this.macronutrientGoalPercentages[i] = 100;

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i]/100).toFixed(4));
          }

          this.currentServingSizeSelection = "1";
          break;
        }

    };
  }

  public updateMacroServingNum() {

    if(this.nutritionBreakdownForm.controls.numOfServings.value > 10000) return;

    for(let i = 0; i < this.macronutrients.length; i++) {
      this.macronutrients[i] = Number((this.originalMacronutrients[i]*this.nutritionBreakdownForm.controls.numOfServings.value).toFixed(4));

      this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i)
      if(this.macronutrientGoalPercentages[i] > 100) this.macronutrientGoalPercentages[i] = 100;
    }

    this.data = [this.macronutrients[0], this.macronutrients[1], this.macronutrients[2]];
  }
}
