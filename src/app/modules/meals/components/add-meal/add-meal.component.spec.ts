import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

import { AddMealComponent } from './add-meal.component';

describe('AddMealComponent', () => {
  let component: AddMealComponent;
  let fixture: ComponentFixture<AddMealComponent>;
  let toastrSpy;
  let firestoreSpy;
  let userInfoSpy;

  beforeEach(async () => {
    userInfoSpy = jasmine.createSpyObj('UserInfoService', ['getEmail']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'valueChanges']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
        FontAwesomeModule,
        ChartsModule
      ],
      declarations: [ AddMealComponent ],
      providers: [
        {
          provide: ToastrService,
          useValue: toastrSpy
        },
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: UserInfoService,
          useValue: userInfoSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
