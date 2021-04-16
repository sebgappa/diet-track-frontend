import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IMicro } from 'src/app/models/micro.model';
import { MicronutrientsService } from 'src/app/services/micronutrients/micronutrients.service';

@Component({
  selector: 'app-micros',
  templateUrl: './micros.component.html',
  styleUrls: ['./micros.component.scss']
})
export class MicrosComponent implements OnInit {

  public micros: IMicro[];

  constructor(
    private micronutrients: MicronutrientsService) { }

  ngOnInit(): void {
    this.micronutrients.clearTotalMacroNutrientConsumed();

    Promise.all([
      this.micronutrients.setBreakfastMicronutrients(),
      this.micronutrients.setLunchMicronutrients(),
      this.micronutrients.setDinnerMicronutrients(),
      this.micronutrients.setSnacksMicronutrients()]).then(() => {
        this.micros = this.micronutrients.getMicronutrientObjects();
      });

  }

  microsInTheGreen(currentAmount: number, goalAmount: number): string {
    if (currentAmount >= goalAmount && currentAmount < goalAmount + 10) {
      return 'green';
    } else if (currentAmount > goalAmount + 10) {
      return 'red';
    }
  }

}
