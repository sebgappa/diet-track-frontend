import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { faBatteryHalf, faBreadSlice, faCheck, faCheese, faDrumstickBite } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Goals } from 'src/app/enums/goals.enum';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;
  public tickIcon = faCheck;
  public get goalsForm() { return this.goalsFormGroup.controls; }
  public goalsFormGroup: FormGroup;

  public proteinFieldEnabled = false;
  public carbFieldEnabled = false;
  public fatFieldEnabled = false;
  public calorieFieldEnabled = false;

  public protein = faDrumstickBite;
  public fats = faCheese;
  public carbs = faBreadSlice;
  public calories = faBatteryHalf

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public auth: AuthService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private goals: GoalsService) {}

  ngOnInit(): void {
    this.goalsFormGroup = this.formBuilder.group({
      protein: [{value: 0, disabled: true}],
      fat: [{value: 0, disabled: true}],
      carbs: [{value: 0, disabled: true}],
      calories: [{value: 0, disabled: true}]
    });

    this.goals.fetchGoals().then(() => {
      this.goalsFormGroup.controls['protein'].setValue(this.goals.getMacroNutrientGoal(Goals.protein));
      this.goalsFormGroup.controls['fat'].setValue(this.goals.getMacroNutrientGoal(Goals.fat));
      this.goalsFormGroup.controls['carbs'].setValue(this.goals.getMacroNutrientGoal(Goals.carbs));
      this.goalsFormGroup.controls['calories'].setValue(this.goals.getMacroNutrientGoal(Goals.calories));
    });

    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe(profile => {
        this.profileJson = JSON.stringify(profile, null, 2)
      });
  }

  updateGoals(goalName: string) {
    switch(goalName) {
      case 'protein':
        Promise.resolve(this.goals.setMacroNutrientGoal(Goals.protein, this.goalsFormGroup.controls.protein.value)).then(() => {
          this.toastr.success("Updated!");
          this.goalsFormGroup.controls['protein'].disable();
          this.proteinFieldEnabled = false;
        }, () => {
          this.toastr.error("Failed to update.");
        });
        break;
      case 'fat':
        Promise.resolve(this.goals.setMacroNutrientGoal(Goals.fat, this.goalsFormGroup.controls.fat.value)).then(() => {
          this.toastr.success("Updated!");
          this.goalsFormGroup.controls['fat'].disable();
          this.fatFieldEnabled = false;
        }, () => {
          this.toastr.error("Failed to update.");
        });
        break;
      case 'carbs':
        Promise.resolve(this.goals.setMacroNutrientGoal(Goals.carbs, this.goalsFormGroup.controls.carbs.value)).then(() => {
          this.toastr.success("Updated!");
          this.goalsFormGroup.controls['carbs'].disable();
          this.carbFieldEnabled = false;
        }, () => {
          this.toastr.error("Failed to update.");
        });
        break;
      case 'calories':
        Promise.resolve(this.goals.setMacroNutrientGoal(Goals.calories, this.goalsFormGroup.controls.calories.value)).then(() => {
          this.toastr.success("Updated!");
          this.goalsFormGroup.controls['calories'].disable();
          this.calorieFieldEnabled = false;
         }, () => {
          this.toastr.error("Failed to update.");
        });
        break;
      default:
        break;
    }
  }

  enableProteinField() {
    this.goalsFormGroup.controls['protein'].enable();
    this.proteinFieldEnabled = true;
  }

  enableFatField() {
    this.goalsFormGroup.controls['fat'].enable();
    this.fatFieldEnabled = true;
  }

  enableCarbsField() {
    this.goalsFormGroup.controls['carbs'].enable();
    this.carbFieldEnabled = true;
  }

  enableCalorieField() {
    this.goalsFormGroup.controls['calories'].enable();
    this.calorieFieldEnabled = true;
  }
}
