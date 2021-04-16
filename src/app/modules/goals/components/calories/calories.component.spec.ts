import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { of } from 'rxjs';
import { AuthServiceStub } from 'src/app/infrastructure/auth-stub.component';
import { CaloriesService } from 'src/app/services/calories/calories.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { CaloriesComponent } from './calories.component';


describe('CaloriesComponent', () => {
  let component: CaloriesComponent;
  let fixture: ComponentFixture<CaloriesComponent>;
  let calorieServiceSpy;
  let goalsServiceSpy;

  beforeEach(async () => {
    calorieServiceSpy = jasmine.createSpyObj('CaloriesService',
    ['setBreakfastCalories',
      'setLunchCalories',
      'setDinnerCalories',
      'setSnacksCalories',
      'getTotalCaloriesConsumed',
      'getCaloriesConsumedPerMeal',
      'getRemainingCalories']);
    goalsServiceSpy = jasmine.createSpyObj('GoalsService', ['getMacroNutrientGoal', 'fetchGoals']);
    goalsServiceSpy.fetchGoals.and.returnValue(Promise.resolve());


    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        ChartsModule
      ],
      declarations: [ CaloriesComponent ],
      providers: [
        {
          provide: CaloriesService,
          useValue: calorieServiceSpy
        },
        {
          provide: GoalsService,
          useValue: goalsServiceSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
