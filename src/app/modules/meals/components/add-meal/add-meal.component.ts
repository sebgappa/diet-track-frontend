import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCamera, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

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
  }
  public get mealForm() { return this.addMealForm.controls; }
  public addMealForm: FormGroup;

  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {
    window.sessionStorage.getItem("")
    
  }

  ngOnInit(): void {
    this.addMealForm = this.formBuilder.group({
      mealName: [null, [Validators.required, Validators.maxLength(30)]],
      items: [null, Validators.required]
    });
  }
}
