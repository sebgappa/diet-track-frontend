import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { AuthServiceStub } from 'src/app/infrastructure/auth-stub.component';
import { CaloriesComponent } from '../calories/calories.component';

import { GoalsComponent } from './goals.component';

describe('GoalsComponent', () => {
  let component: GoalsComponent;
  let fixture: ComponentFixture<GoalsComponent>;
  let firestoreSpy;

  beforeEach(waitForAsync(() => {
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'valueChanges']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        ChartsModule
      ],
      declarations: [ GoalsComponent, CaloriesComponent ],
      providers: [
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
