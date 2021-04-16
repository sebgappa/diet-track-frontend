import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MicronutrientsService } from 'src/app/services/micronutrients/micronutrients.service';
import { MicrosComponent } from './micros.component';

describe('MicrosComponent', () => {
  let component: MicrosComponent;
  let fixture: ComponentFixture<MicrosComponent>;
  let micronutrientsServiceSpy;

  beforeEach(async () => {
    micronutrientsServiceSpy = jasmine.createSpyObj('MicronutrientsService', [
      'setBreakfastMicronutrients',
      'setLunchMicronutrients',
      'setDinnerMicronutrients',
      'setSnacksMicronutrients',
      'getMicronutrientObjects',
      'clearTotalMacroNutrientConsumed']);

    await TestBed.configureTestingModule({
      declarations: [ MicrosComponent ],
      providers: [
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
