import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Calories } from 'src/app/enums/calories.enum';
import { Goals } from 'src/app/enums/goals.enum';
import { CaloriesService } from 'src/app/services/calories/calories.service';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  public breakfast;
  public lunch;
  public dinner;
  public snacks;

  public deleteIcon = faTimes;

  public breakfastCalories = 0;
  public lunchCalories = 0;
  public dinnerCalories = 0;
  public snacksCalories = 0;
  public totalFoodCalories = 0;
  public goalCalories = 0;
  public remainingCalories = 0;

  private unsubscribe: Subject<void> = new Subject();
  private userEmail: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: AngularFirestore,
    private goals: GoalsService,
    private calories: CaloriesService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
      this.goals.fetchGoals(user.email).then(() => {
        this.userEmail = user.email;
        this.goalCalories = this.goals.getMacroNutrientGoal(Goals.calories);
      })

      this.setFood(user.email);
      Promise.all([
        this.calories.setBreakfastCalories(user.email),
        this.calories.setLunchCalories(user.email),
        this.calories.setDinnerCalories(user.email),
        this.calories.setSnacksCalories(user.email)]).then(() => {
          this.breakfastCalories = this.calories.getCaloriesConsumedPerMeal(Calories.breakfast);
          this.lunchCalories = this.calories.getCaloriesConsumedPerMeal(Calories.lunch);
          this.dinnerCalories = this.calories.getCaloriesConsumedPerMeal(Calories.dinner);
          this.snacksCalories = this.calories.getCaloriesConsumedPerMeal(Calories.snacks);
          this.remainingCalories = this.calories.getRemainingCalories();
          this.totalFoodCalories = this.calories.getTotalCaloriesConsumed();
        });
    });
  }

  setFood(email: string) {
    this.breakfast = this.store.collection(email).doc('food').collection('breakfast').valueChanges({ idField: 'id' });
    this.lunch = this.store.collection(email).doc('food').collection('lunch').valueChanges({ idField: 'id' });
    this.dinner = this.store.collection(email).doc('food').collection('dinner').valueChanges({ idField: 'id' });
    this.snacks = this.store.collection(email).doc('food').collection('snacks').valueChanges({ idField: 'id' });
  }

  addFood(meal: string) {
    this.router.navigate(['/food/', meal]);
  }

  caloriesInTheGreen(): boolean {
    if (this.remainingCalories > 0) {
      return true;
    }

    return false;
  }

  deleteBreakfastItem(id: string) {
    this.store.collection(this.userEmail).doc('food').collection('breakfast').doc(id).delete().then(() => {
      Promise.all([this.calories.setBreakfastCalories(this.userEmail)]).then(() => {
        this.breakfastCalories = this.calories.getCaloriesConsumedPerMeal(Calories.breakfast);
        this.remainingCalories = this.calories.getRemainingCalories();
        this.totalFoodCalories = this.calories.getTotalCaloriesConsumed();
        this.toastr.success("Item deleted");
      });
    }, () => {
      this.toastr.error("Failed to delete item")
    })
  }

  deleteLunchItem(id: string) {
    this.store.collection(this.userEmail).doc('food').collection('lunch').doc(id).delete().then(() => {
      Promise.all([this.calories.setLunchCalories(this.userEmail)]).then(() => {
        this.lunchCalories = this.calories.getCaloriesConsumedPerMeal(Calories.lunch);
        this.remainingCalories = this.calories.getRemainingCalories();
        this.totalFoodCalories = this.calories.getTotalCaloriesConsumed();
        this.toastr.success("Item deleted");
      });
    }, () => {
      this.toastr.error("Failed to delete item")
    })
  }

  deleteDinnerItem(id: string) {
    this.store.collection(this.userEmail).doc('food').collection('dinner').doc(id).delete().then(() => {
      Promise.all([this.calories.setDinnerCalories(this.userEmail)]).then(() => {
        this.dinnerCalories = this.calories.getCaloriesConsumedPerMeal(Calories.dinner);
        this.remainingCalories = this.calories.getRemainingCalories();
        this.totalFoodCalories = this.calories.getTotalCaloriesConsumed();
        this.toastr.success("Item deleted");
      });
    }, () => {
      this.toastr.error("Failed to delete item")
    })
  }

  deleteSnacksItem(id: string) {
    this.store.collection(this.userEmail).doc('food').collection('snacks').doc(id).delete().then(() => {
      Promise.all([this.calories.setSnacksCalories(this.userEmail)]).then(() => {
        this.snacksCalories = this.calories.getCaloriesConsumedPerMeal(Calories.snacks);
        this.remainingCalories = this.calories.getRemainingCalories();
        this.totalFoodCalories = this.calories.getTotalCaloriesConsumed();
        this.toastr.success("Item deleted");
      });
    }, () => {
      this.toastr.error("Failed to delete item")
    })
  }
}

