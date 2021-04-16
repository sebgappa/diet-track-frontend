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
  private userEmail: string;

  constructor(
    public auth: AuthService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private goals: GoalsService) {}

  ngOnInit(): void {
    this.goalsFormGroup = this.formBuilder.group({
      protein: [this.goals.getMacroNutrientGoal(Goals.protein)],
      fat: [this.goals.getMacroNutrientGoal(Goals.fat)],
      carbs: [this.goals.getMacroNutrientGoal(Goals.carbs)],
      calories: [this.goals.getMacroNutrientGoal(Goals.calories)]
    });

    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe(profile => {
        this.userEmail = profile.email,
        this.profileJson = JSON.stringify(profile, null, 2)
      });
  }

  updateGoals(goalName: string) {
    switch(goalName) {
      case 'protein':
        Promise.resolve(this.goals.setMacroNutrientGoal(Goals.protein, this.goalsFormGroup.controls.protein.value, this.userEmail)).then(() => {
          this.toastr.success("Updated!");
          this.proteinFieldEnabled = false;
        }, () => {
          this.toastr.error("Failed to update.");
        });
        break;
      case 'fat':
        Promise.resolve(this.goals.setMacroNutrientGoal(Goals.fat, this.goalsFormGroup.controls.fat.value, this.userEmail)).then(() => {
          this.toastr.success("Updated!");
          this.fatFieldEnabled = false;
        }, () => {
          this.toastr.error("Failed to update.");
        });
        break;
      case 'carbs':
        Promise.resolve(this.goals.setMacroNutrientGoal(Goals.carbs, this.goalsFormGroup.controls.carbs.value, this.userEmail)).then(() => {
          this.toastr.success("Updated!");
          this.carbFieldEnabled = false;
        }, () => {
          this.toastr.error("Failed to update.");
        });
        break;
      case 'calories':
        Promise.resolve(this.goals.setMacroNutrientGoal(Goals.calories, this.goalsFormGroup.controls.calories.value, this.userEmail)).then(() => {
          this.toastr.success("Updated!");
          this.calorieFieldEnabled = false;
         }, () => {
          this.toastr.error("Failed to update.");
        });
        break;
      default:
        break;
    }
  }
}
