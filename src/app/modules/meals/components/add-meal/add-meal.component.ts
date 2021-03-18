import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCamera, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { IMeal } from 'src/app/models/meal.model';
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

  public get mealForm() { return this.addMealForm.controls; }
  public addMealForm: FormGroup;

  public meal: IMeal;

  constructor(
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    const jSONMeal = this.sessionStorageService.readObject('meal');
    this.meal = new IMeal;
    Object.assign(this.meal, jSONMeal);

    this.addMealForm = this.formBuilder.group({
      mealName: [this.meal.name, [Validators.required, Validators.maxLength(30)]],
      items: [this.meal.items, Validators.required]
    });
  }

  saveMeal() {
    this.sessionStorageService.removeObject('meal');
    this.toastr.success('Meal added');
    this.router.navigate(['/meals']);
  }

  addFoodItem() {

    const jSONMeal = this.sessionStorageService.readObject('meal');

    if (jSONMeal === null) {
      const meal: IMeal = {
        name: this.addMealForm.controls.mealName.value,
        items: []
      };
      this.sessionStorageService.saveObject('meal', meal);
    } else {
      const meal = new IMeal;
      Object.assign(meal, jSONMeal);
      meal.name = this.addMealForm.controls.mealName.value;
      this.sessionStorageService.saveObject('meal', meal);
    }

    this.router.navigate(['/food/new']);
  }
}

