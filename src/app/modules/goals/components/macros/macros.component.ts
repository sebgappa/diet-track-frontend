import { Component, OnInit } from '@angular/core';
import { faBreadSlice, faCheese, faDrumstickBite } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Goals } from 'src/app/enums/goals.enum';
import { MacroNutrients } from 'src/app/enums/macronutrients.enum';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { MacronutrientsService } from 'src/app/services/macronutrients/macronutrients.service';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss']
})
export class MacrosComponent implements OnInit {
  public labels: Label[] = ['Protein', 'Fats', 'Carbs'];
  public type: ChartType = 'pie';
  public data = [10, 10, 10];

  public proteinIcon = faDrumstickBite;
  public fatsIcon = faCheese;
  public carbsIcon = faBreadSlice;

  public proteinTotal = 0;
  public proteinGoal = 0;

  public fatTotal = 0;
  public fatGoal = 0;

  public carbsTotal = 0;
  public carbsGoal = 0;

  public options: ChartOptions = {
    legend: {
      display: false
    }
  };

  constructor(
    private macronutrients: MacronutrientsService,
    private goals: GoalsService) { }

  ngOnInit(): void {
    this.macronutrients.clearTotalMacroNutrientConsumed();

    this.goals.fetchGoals().then(() => {
      this.proteinGoal = this.goals.getMacroNutrientGoal(Goals.protein);
      this.fatGoal = this.goals.getMacroNutrientGoal(Goals.fat);
      this.carbsGoal = this.goals.getMacroNutrientGoal(Goals.carbs);
    });
    Promise.all([
      this.macronutrients.setBreakfastMacroNutrients(),
      this.macronutrients.setLunchMacroNutrients(),
      this.macronutrients.setDinnerMacroNutrients(),
      this.macronutrients.setSnacksMacroNutrients()]).then(() => {
        this.proteinTotal = this.macronutrients.getTotalMacroNutrientConsumed(MacroNutrients.protein);
        this.fatTotal = this.macronutrients.getTotalMacroNutrientConsumed(MacroNutrients.fat);
        this.carbsTotal = this.macronutrients.getTotalMacroNutrientConsumed(MacroNutrients.carbs);
        this.data = [this.proteinTotal, this.fatTotal, this.carbsTotal];
      });
  }

  proteinStatus(): string {
    if (this.proteinTotal >= this.proteinGoal && this.proteinTotal < this.proteinGoal + 10) {
      return 'green';
    } else if (this.proteinTotal > this.proteinGoal + 10) {
      return 'red';
    }
  }

  fatStatus(): string {
    if (this.fatTotal >= this.fatGoal && this.fatTotal < this.fatGoal + 10) {
      return 'green';
    } else if (this.fatTotal > this.fatGoal + 10) {
      return 'red';
    }
  }

  carbsStatus(): string {
    if (this.carbsTotal >= this.carbsGoal && this.carbsTotal < this.carbsGoal + 10) {
      return 'green';
    } else if (this.carbsTotal > this.carbsGoal + 10) {
      return 'red';
    }
  }
}


