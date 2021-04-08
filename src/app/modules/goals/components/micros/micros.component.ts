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
export class MicrosComponent implements OnInit, OnDestroy {

  public micros: IMicro[];

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private micronutrients: MicronutrientsService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.micronutrients.clearTotalMacroNutrientConsumed();

    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
      Promise.all([
        this.micronutrients.setBreakfastMicronutrients(user.email),
        this.micronutrients.setLunchMicronutrients(user.email),
        this.micronutrients.setDinnerMicronutrients(user.email),
        this.micronutrients.setSnacksMicronutrients(user.email)]).then(() => {
          this.micros = this.micronutrients.getMicronutrientObjects();
      });
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  microsInTheGreen(currentAmount: number, goalAmount: number): string {
    if (currentAmount >= goalAmount && currentAmount < goalAmount + 10) {
      return 'green';
    } else if (currentAmount > goalAmount + 10) {
      return 'red';
    }
  }

}
