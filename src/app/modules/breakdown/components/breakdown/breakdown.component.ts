import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
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

  public forMeal = false;

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

  public meal: string;

  private unsubscribe: Subject<void> = new Subject();
  private barcode: string;

  private currentServingSizeSelection: string;

  private user;

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private goalService: GoalsService,
    private store: AngularFirestore,
    private auth: AuthService) { }

  ngOnInit(): void {
    if (this.router.url.includes('/new')) {
      this.forMeal = true;
    }

    this.nutritionBreakdownForm = this.formBuilder.group({
      servingSize: [100, Validators.required],
      numOfServings: [1, [Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')]]
    });

    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        if (params.has('id')) {
          this.barcode = params.get('id');

        }
        if (params.has('meal')) {
          this.meal = params.get('meal');
        }
      });

    this.foodService.getFood(this.barcode).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      this.data = [
        response.product.nutriments.proteins_value,
        response.product.nutriments.fat_value,
        response.product.nutriments.carbohydrates_value];

      this.foodObject = {
        code: response.code,
        product: {
          product_name: response.product.product_name,
          nutriments: {
            'energy-kcal_100g': response.product.nutriments['energy-kcal_100g'] ? response.product.nutriments['energy-kcal_100g'] : 0,
            'energy-kcal_value': response.product.nutriments['energy-kcal_value'] ? response.product.nutriments['energy-kcal_value'] : 0,
            carbohydrates_100g: response.product.nutriments.carbohydrates_100g ? response.product.nutriments.carbohydrates_100g : 0,
            carbohydrates_value: response.product.nutriments.carbohydrates_value ? response.product.nutriments.carbohydrates_value : 0,
            fat_100g: response.product.nutriments.fat_100g ? response.product.nutriments.fat_100g : 0,
            fat_value: response.product.nutriments.fat_value ? response.product.nutriments.fat_value : 0,
            proteins_100g: response.product.nutriments.proteins_100g ? response.product.nutriments.proteins_100g : 0,
            proteins_value: response.product.nutriments.proteins_value ? response.product.nutriments.proteins_value : 0,
            fiber_value: response.product.nutriments.fiber_value ? response.product.nutriments.fiber_value : 0,
            salt_value :  response.product.nutriments.salt_value ? response.product.nutriments.salt_value : 0,
            'saturated-fat_value': response.product.nutriments['saturated-fat_value'] ? response.product.nutriments['saturated-fat_value'] : 0,
            sodium_value: response.product.nutriments.sodium_value ? response.product.nutriments.sodium_value : 0,
            sugars_value: response.product.nutriments.sugars_value ? response.product.nutriments.sugars_value : 0,
            calcium_value: response.product.nutriments.calcium_value ? response.product.nutriments.calcium_value : 0,
            cholesterol_value: response.product.nutriments.cholesterol_value ? response.product.nutriments.cholesterol_value : 0,
            iron_value: response.product.nutriments.iron_value ? response.product.nutriments.iron_value : 0,
            magnesium_value: response.product.nutriments.magnesium_value ? response.product.nutriments.magnesium_value : 0,
            zinc_value: response.product.nutriments.zinc_value ? response.product.nutriments.zinc_value : 0,
            'trans-fat_value': response.product.nutriments['trans-fat_value'] ? response.product.nutriments['trans-fat_value'] : 0,
            'vitamin-a_value': response.product.nutriments['vitamin-a_value'] ? response.product.nutriments['vitamin-a_value'] : 0,
            'vitamin-c_value': response.product.nutriments['vitamin-c_value'] ? response.product.nutriments['vitamin-c_value'] : 0,
            'vitamin-b12_value': response.product.nutriments['vitamin-b12_value'] ? response.product.nutriments['vitamin-b12_value'] : 0,
            'vitamin-d_value': response.product.nutriments['vitamin-d_value'] ? response.product.nutriments['vitamin-d_value'] : 0
          },
          brands: response.product.brands
        },
        status_verbose: response.status_verbose
      };

      this.macronutrients = [this.foodObject.product.nutriments.proteins_100g,
                            this.foodObject.product.nutriments.fat_100g,
                            this.foodObject.product.nutriments.carbohydrates_100g,
                            this.foodObject.product.nutriments['energy-kcal_100g']];

      this.originalMacronutrients = [this.foodObject.product.nutriments.proteins_100g,
                                    this.foodObject.product.nutriments.fat_100g,
                                    this.foodObject.product.nutriments.carbohydrates_100g,
                                    this.foodObject.product.nutriments['energy-kcal_100g']];

      this.macronutrientGoalPercentages = [
        this.calculatePercentageOfMacronutrientGoal(response.product.nutriments.proteins_100g, MacroNutrients.protein),
        this.calculatePercentageOfMacronutrientGoal(response.product.nutriments.fat_100g, MacroNutrients.fat),
        this.calculatePercentageOfMacronutrientGoal(response.product.nutriments.carbohydrates_100g, MacroNutrients.carbs),
        this.calculatePercentageOfMacronutrientGoal(response.product.nutriments['energy-kcal_100g'], MacroNutrients.calories)
      ];
    }, () => {
      console.log('No response');
    });

    this.currentServingSizeSelection = this.nutritionBreakdownForm.controls.servingSize.value;

    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
      this.user = user;
    });
  }

  public addFoodItem() {
    if (this.forMeal){
      this.addFoodItemForMeal();
      return;
    }

    this.foodObject.product.nutriments.proteins_value = this.macronutrients[0];
    this.foodObject.product.nutriments.fat_value = this.macronutrients[1];
    this.foodObject.product.nutriments.carbohydrates_value = this.macronutrients[2];
    this.foodObject.product.nutriments['energy-kcal_value'] = this.macronutrients[3];
    this.foodObject.product.serving_number = this.nutritionBreakdownForm.controls.numOfServings.value;
    this.foodObject.product.serving_size = this.nutritionBreakdownForm.controls.servingSize.value + 'g';

    if (this.foodObject.product.product_name.length > 30) {
      this.foodObject.product.product_name = this.foodObject.product.product_name.substring(0, 30) + '...';
    }

    if (this.foodObject.product.brands.length > 30) {
      this.foodObject.product.brands = this.foodObject.product.brands.substring(0, 30) + '...';
    }

    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(this.user.email).doc('food').collection('history').add(this.foodObject),
        this.store.collection(this.user.email).doc('food').collection(this.meal).add(this.foodObject)
      ]);
      return promise;
    });

    this.toastr.success('Item added');

    this.router.navigate(['/food/', this.meal]);
  }

  public addFoodItemForMeal() {
    this.sessionStorageService.saveFoodItemToMeal(this.foodObject);
    this.toastr.success('Iteam added');
    this.router.navigate(['/food/', this.meal]);
  }

  public calculatePercentageOfMacronutrientGoal(foodValue: number, goalValue: MacroNutrients) {
    return Math.round((foodValue / this.goalService.getMacroNutrientGoal(goalValue)) * 100);
  }

  public updateMacroServingSize() {
    switch (this.nutritionBreakdownForm.controls.servingSize.value) {
      case '100':
        if (this.currentServingSizeSelection == '100') { return; }
        else if (this.currentServingSizeSelection == '10') {
          for (let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i] * 10).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i);
            if (this.macronutrientGoalPercentages[i] > 100) { this.macronutrientGoalPercentages[i] = 100; }

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i] * 10).toFixed(4));
          }

          this.currentServingSizeSelection = '100';
          break;
        } else {
          for (let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i] * 100).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i);
            if (this.macronutrientGoalPercentages[i] > 100) { this.macronutrientGoalPercentages[i] = 100; }

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i] * 100).toFixed(4));
          }

          this.currentServingSizeSelection = '100';
          break;
        }
      case '10':
        if (this.currentServingSizeSelection == '10') { return; }
        else if (this.currentServingSizeSelection == '100') {
          for (let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i] / 10).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i);
            if (this.macronutrientGoalPercentages[i] > 100) { this.macronutrientGoalPercentages[i] = 100; }

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i] / 10).toFixed(4));
          }

          this.currentServingSizeSelection = '10';
          break;
        }
        else {
          for (let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i] * 10).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i);
            if (this.macronutrientGoalPercentages[i] > 100) { this.macronutrientGoalPercentages[i] = 100; }

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i] * 10).toFixed(4));
          }

          this.currentServingSizeSelection = '10';
          break;
        }
      case '1':
        if (this.currentServingSizeSelection == '1') { return; }
        else if (this.currentServingSizeSelection == '10') {
          for (let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i] / 10).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i);
            if (this.macronutrientGoalPercentages[i] > 100) { this.macronutrientGoalPercentages[i] = 100; }

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i] / 10).toFixed(4));
          }

          this.currentServingSizeSelection = '1';
          break;
        } else {
          for (let i = 0; i < this.macronutrients.length; i++) {
            this.macronutrients[i] = Number((this.macronutrients[i] / 100).toFixed(4));

            this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i);
            if (this.macronutrientGoalPercentages[i] > 100) { this.macronutrientGoalPercentages[i] = 100; }

            this.originalMacronutrients[i] = Number((this.originalMacronutrients[i] / 100).toFixed(4));
          }

          this.currentServingSizeSelection = '1';
          break;
        }

    }
  }

  public updateMacroServingNum() {

    if (this.nutritionBreakdownForm.controls.numOfServings.value > 10000) { return; }

    for (let i = 0; i < this.macronutrients.length; i++) {
      this.macronutrients[i] = Number((
        this.originalMacronutrients[i] *
        this.nutritionBreakdownForm.controls.numOfServings.value).toFixed(4));

      this.macronutrientGoalPercentages[i] = this.calculatePercentageOfMacronutrientGoal(this.macronutrients[i], i);
      if (this.macronutrientGoalPercentages[i] > 100) { this.macronutrientGoalPercentages[i] = 100; }
    }

    this.data = [this.macronutrients[0], this.macronutrients[1], this.macronutrients[2]];
  }
}
