import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartsModule } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

import { ViewMealComponent } from './view-meal.component';

describe('ViewMealComponent', () => {
  let component: ViewMealComponent;
  let fixture: ComponentFixture<ViewMealComponent>;
  let firestoreSpy;
  let toastrSpy;
  let userInfoSpy;

  beforeEach(async () => {
    userInfoSpy = jasmine.createSpyObj('UserInfoService', ['getEmail']);

    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'valueChanges']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ChartsModule,
        SharedModule
      ],
      declarations: [ ViewMealComponent ],
      providers: [
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: UserInfoService,
          useValue: userInfoSpy
        },
        {
          provide: ToastrService,
          useValue: toastrSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
