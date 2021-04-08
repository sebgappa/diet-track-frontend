import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { faCamera, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Goals } from 'src/app/enums/goals.enum';
import { MacroNutrients } from 'src/app/enums/macronutrients.enum';
import { IMeal } from 'src/app/models/meal.model';
import { CaloriesService } from 'src/app/services/calories/calories.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { MacronutrientsService } from 'src/app/services/macronutrients/macronutrients.service';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {
  public cameraIcon = faCamera;
  public tickIcon = faCheck;
  public plusIcon = faPlus;

  public labels: Label[] = ['Protein', 'Fats', 'Carbs'];
  public type: ChartType = 'doughnut';
  public data = [10, 10, 10];
  public options: ChartOptions = {
    legend: {
      display: false
    }
  };

  public proteinTotal = 0;
  public fatTotal = 0;
  public carbsTotal = 0;
  public caloriesTotal = 0;

  public proteinPercentage = 0;
  public fatPercentage = 0;
  public carbsPercentage = 0;
  public caloriesPercentage = 0;

  public get mealForm() { return this.addMealForm.controls; }
  public addMealForm: FormGroup;

  public meal: IMeal;

  private imageSrcs: string[] = [
    'assets/images/default-meal-breakfast.jpg',
    'assets/images/default-meal-lunch.jpg',
    'assets/images/default-meal-dinner.jpg',
    'assets/images/default-meal-snacks.jpg'
  ];

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private toastr: ToastrService,
    private macros: MacronutrientsService,
    private store: AngularFirestore,
    private auth: AuthService,
    private calories: CaloriesService,
    private goals: GoalsService) {}

  ngOnInit(): void {
    const jSONMeal = this.sessionStorageService.readObject('meal');
    this.meal = new IMeal;
    Object.assign(this.meal, jSONMeal);

    this.addMealForm = this.formBuilder.group({
      mealName: [this.meal.name, [Validators.required, Validators.maxLength(30)]],
      mealDescription: [this.meal.description],
      items: [this.meal.items, Validators.required]
    });

    if (this.meal.items) {
      this.calories.clearMealCalories();
      this.calories.setMealCalories(this.meal);

      this.macros.clearTotalMacroNutrientConsumedForMeal();
      this.macros.setMacronutrientsConsumedForMeal(this.meal);

      this.caloriesTotal = this.calories.getTotalCaloriesInMeal();
      this.proteinTotal = this.macros.getTotalMacroNutrientConsumedForMeal(MacroNutrients.protein);
      this.fatTotal = this.macros.getTotalMacroNutrientConsumedForMeal(MacroNutrients.fat);
      this.carbsTotal = this.macros.getTotalMacroNutrientConsumedForMeal(MacroNutrients.carbs);

      this.caloriesPercentage = this.calculatePercentageOfCalorieGoal(this.caloriesTotal);
      this.proteinPercentage = this.calculatePercentageOfTotalMacros(this.proteinTotal);
      this.fatPercentage = this.calculatePercentageOfTotalMacros(this.fatTotal);
      this.carbsPercentage = this.calculatePercentageOfTotalMacros(this.carbsTotal);

      this.data = [this.proteinTotal, this.fatTotal, this.carbsTotal];
    }
  }

  saveMeal() {
    this.meal.image = this.imageSrcs[Math.floor(Math.random() * this.imageSrcs.length)];
    this.meal.name = this.addMealForm.controls.mealName.value;
    this.meal.description = this.addMealForm.controls.mealDescription.value;
    this.meal.calories = this.caloriesTotal;
    this.meal.protein = this.proteinTotal;
    this.meal.fat = this.fatTotal;
    this.meal.carbs = this.carbsTotal;


    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
      this.store.collection(user.email).doc('food').collection('meals').add(Object.assign({}, this.meal)).then(() => {
        this.toastr.success('Meal added');
        this.sessionStorageService.removeObject('meal');
        this.addMealForm.reset();
        this.router.navigate(['/meals']);
      }, () => {
        this.toastr.error('Failed to store meal.');
      });
    }, () => {
      this.toastr.error('Couldn\'t save meal, failed to retrieve user.');
    });
  }

  addFoodItem() {
    const jSONMeal = this.sessionStorageService.readObject('meal');

    if (jSONMeal === null) {
      const meal: IMeal = {
        name: this.addMealForm.controls.mealName.value,
        description: this.addMealForm.controls.mealDescription.value,
        items: []
      };
      this.sessionStorageService.saveObject('meal', meal);
    } else {
      const meal = new IMeal;
      Object.assign(meal, jSONMeal);
      meal.name = this.addMealForm.controls.mealName.value;
      meal.description = this.addMealForm.controls.mealDescription.value;
      this.sessionStorageService.saveObject('meal', meal);
    }

    this.router.navigate(['/food/new']);
  }

  private calculatePercentageOfTotalMacros(macroTotal: number) {
    const percentage =  Math.round((macroTotal / (this.proteinTotal + this.fatTotal + this.carbsTotal)) * 100);

    if (percentage > 100) { return 100; }

    return percentage;
  }

  private calculatePercentageOfCalorieGoal(calorieTotal: number) {
    const percentage = Math.round((calorieTotal / this.goals.getMacroNutrientGoal(Goals.calories)) * 100);

    if (percentage > 100) { return 100; }

    return percentage;
  }
}
