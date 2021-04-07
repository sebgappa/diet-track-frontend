import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { faAppleAlt, faDrumstickBite, faEgg, faHotdog } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Calories } from 'src/app/enums/calories.enum';
import { Goals } from 'src/app/enums/goals.enum';
import { MacroNutrients } from 'src/app/enums/macronutrients.enum';
import { CaloriesService } from 'src/app/services/calories/calories.service';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.scss']
})
export class CaloriesComponent implements OnInit {
  public labels: Label[] = [
  `Lunch (%)`,
  `Dinner (%)`,
  `Snacks (%)`,
  'Breakfast (%)'];
  public type: ChartType = 'pie';
  public data = [10, 10, 10, 10];
  public options: ChartOptions = {
    legend: {
      display: false
    }
  };

  public totalCalories = 0;
  public remainingCalories = 0;
  public calorieGoal = 0;


  public breakfastIcon = faEgg;
  public lunchIcon = faHotdog;
  public dinnerIcon = faDrumstickBite;
  public snacksIcon = faAppleAlt;

  private breakfastPercentage;
  private lunchPercentage;
  private dinnerPercentage;
  private snacksPercentage;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private calories: CaloriesService,
    private goals: GoalsService,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
      Promise.all([
        this.calories.setBreakfastCalories(user.email),
        this.calories.setLunchCalories(user.email),
        this.calories.setDinnerCalories(user.email),
        this.calories.setSnacksCalories(user.email)]).then(() => {
          this.breakfastPercentage = this.calculateMealPercentageOfToalCalories(Calories.breakfast);
          this.lunchPercentage = this.calculateMealPercentageOfToalCalories(Calories.lunch);
          this.dinnerPercentage = this.calculateMealPercentageOfToalCalories(Calories.dinner);
          this.snacksPercentage = this.calculateMealPercentageOfToalCalories(Calories.snacks);

          this.totalCalories = this.calories.getTotalCaloriesConsumed();
          this.calorieGoal = this.goals.getMacroNutrientGoal(Goals.calories);
          this.remainingCalories = this.calories.getRemainingCalories();

          this.data = [this.lunchPercentage, this.dinnerPercentage, this.snacksPercentage, this.breakfastPercentage];
        });
    });
  }

  calculateMealPercentageOfToalCalories(meal: Calories): number {
    return Math.round((this.calories.getCaloriesConsumedPerMeal(meal) / this.calories.getTotalCaloriesConsumed()) * 100);
  }

  caloriesInTheGreen(): boolean {
    if (this.remainingCalories > 0) {
      return true;
    }

    return false;
  }
}
