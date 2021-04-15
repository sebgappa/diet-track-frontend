import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { AuthServiceStub } from 'src/app/infrastructure/auth-stub.component';
import { MacronutrientsService } from 'src/app/services/macronutrients/macronutrients.service';

import { MacrosComponent } from './macros.component';

describe('MacrosComponent', () => {
  let component: MacrosComponent;
  let fixture: ComponentFixture<MacrosComponent>;
  let firestoreSpy;
  let macronutrientsServiceSpy;

  beforeEach(async () => {
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'valueChanges'])
    macronutrientsServiceSpy = jasmine.createSpyObj('MacMacronutrientsService', [
      'setBreakfastMacroNutrients', 
      'setLunchMacroNutrients', 
      'setDinnerMacroNutrients', 
      'setSnacksMacroNutrients',
      'getTotalMacroNutrientConsumed',
      'clearTotalMacroNutrientConsumed'])

    await TestBed.configureTestingModule({
      imports: [
          FontAwesomeModule,
          ChartsModule
      ],
      declarations: [ MacrosComponent ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: MacronutrientsService,
          useValue: macronutrientsServiceSpy
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
