import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Goals } from 'src/app/enums/goals.enum';
import { IMeal } from 'src/app/models/meal.model';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.scss']
})
export class ViewMealComponent implements OnInit {

  public labels: Label[] = ['Protein', 'Fats', 'Carbs'];
  public type: ChartType = 'doughnut';
  public data = [10, 10, 10];
  public options: ChartOptions = {
    legend: {
      display: false
    }
  };
  
  public proteinPercentage = 0;
  public fatPercentage = 0;
  public carbsPercentage = 0;
  public caloriesPercentage = 0;
  
  public meal: IMeal;

  private unsubscribe: Subject<void> = new Subject();
  private mealDoc: AngularFirestoreDocument<IMeal>;

  constructor(
    private route: ActivatedRoute,
    private store: AngularFirestore,
    private auth: AuthService,
    private toastr: ToastrService,
    private goals: GoalsService) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(params => {
      if (params.has('id')) {
        this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
          this.mealDoc = this.store.collection(user.email).doc('food').collection('meals').doc<IMeal>(params.get('id'));
          this.mealDoc.valueChanges().pipe(takeUntil(this.unsubscribe)).subscribe((meal) => {
            this.meal = meal;
            this.setChartData();
            this.caloriesPercentage = this.calculatePercentageOfCalorieGoal(this.meal.calories);
            this.proteinPercentage = this.calculatePercentageOfTotalMacros(this.meal.protein);
            this.fatPercentage = this.calculatePercentageOfTotalMacros(this.meal.fat);
            this.carbsPercentage = this.calculatePercentageOfTotalMacros(this.meal.carbs);
          });
        }, () => {
          this.toastr.error("Failed to retrieve user.")
        })
      }
    }, () => {
      this.toastr.error("Couldn't retrieve ID.")
    });
  }


  private setChartData() {
    this.data = [this.meal.protein, this.meal.fat, this.meal.carbs];
  }

  private calculatePercentageOfTotalMacros(macroTotal: number) {
    const percentage =  Math.round((macroTotal / (this.meal.protein + this.meal.fat + this.meal.carbs)) * 100);

    if (percentage > 100) { return 100; }

    return percentage;
  }

  private calculatePercentageOfCalorieGoal(calorieTotal: number) {
    const percentage = Math.round((calorieTotal / this.goals.getMacroNutrientGoal(Goals.calories)) * 100);

    if (percentage > 100) { return 100; }

    return percentage;
  }
}

