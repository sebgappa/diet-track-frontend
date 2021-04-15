import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '@auth0/auth0-angular';
import { AuthServiceStub } from 'src/app/infrastructure/auth-stub.component';
import { MicronutrientsService } from 'src/app/services/micronutrients/micronutrients.service';

import { MicrosComponent } from './micros.component';

describe('MicrosComponent', () => {
  let component: MicrosComponent;
  let fixture: ComponentFixture<MicrosComponent>;
  let firestoreSpy;
  let micronutrientsServiceSpy;

  beforeEach(async () => {
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'valueChanges']);
    micronutrientsServiceSpy = jasmine.createSpyObj('MicronutrientsService', [
      'setBreakfastMicronutrients',
      'setLunchMicronutrients',
      'setDinnerMicronutrients',
      'setSnacksMicronutrients',
      'getMicronutrientObjects',
      'clearTotalMacroNutrientConsumed'])

    await TestBed.configureTestingModule({
      declarations: [ MicrosComponent ],
      providers: [
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        {
          provide: MicronutrientsService,
          useValue: micronutrientsServiceSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
