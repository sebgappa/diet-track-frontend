import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

import { DiaryComponent } from './diary.component';

describe('DiaryComponent', () => {
  let component: DiaryComponent;
  let fixture: ComponentFixture<DiaryComponent>;
  let firestoreSpy;
  let collectionSpy;
  let docSpy;
  let toastrSpy;
  let userInfoSpy;
  let goalsServiceSpy

  beforeEach(waitForAsync(() => {
    goalsServiceSpy = jasmine.createSpyObj('GoalsService', ['fetchGoals', 'getMacroNutrientGoal']);
    userInfoSpy = jasmine.createSpyObj('UserInfoService', ['getEmail']);

    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    docSpy = jasmine.createSpyObj( 'doc', [ 'collection']);
    collectionSpy = jasmine.createSpyObj( 'collection', [ 'doc', 'valueChanges' ]);

    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.doc.and.returnValue(docSpy);
    docSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.valueChanges.and.returnValue(of([{
      product: {
        product_name: 'test',
        nutriments: {}
      }
    }]));

    goalsServiceSpy.fetchGoals.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
      ],
      declarations: [ DiaryComponent ],
      providers: [
        {
          provide: UserInfoService,
          useValue: userInfoSpy
        },
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: ToastrService,
          useValue: toastrSpy
        }, 
        {
          provide: GoalsService,
          useValue: goalsServiceSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
