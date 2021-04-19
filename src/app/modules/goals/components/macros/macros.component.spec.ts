import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { MacronutrientsService } from 'src/app/services/macronutrients/macronutrients.service';
import { MacrosComponent } from './macros.component';

describe('MacrosComponent', () => {
  let component: MacrosComponent;
  let fixture: ComponentFixture<MacrosComponent>;
  let macronutrientsServiceSpy;
  let goalsServiceSpy;

  beforeEach(async () => {
    goalsServiceSpy = jasmine.createSpyObj('GoalsService', ['getMacroNutrientGoal', 'fetchGoals']);
    macronutrientsServiceSpy = jasmine.createSpyObj('MacronutrientsService', [
      'setBreakfastMacroNutrients',
      'setLunchMacroNutrients',
      'setDinnerMacroNutrients',
      'setSnacksMacroNutrients',
      'getTotalMacroNutrientConsumed',
      'clearTotalMacroNutrientConsumed']);
      goalsServiceSpy.fetchGoals.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [
          FontAwesomeModule,
          ChartsModule
      ],
      declarations: [ MacrosComponent ],
      providers: [
        {
          provide: MacronutrientsService,
          useValue: macronutrientsServiceSpy
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
    fixture = TestBed.createComponent(MacrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
