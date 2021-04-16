import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

import { MyMealsComponent } from './my-meals.component';

describe('MyMealsComponent', () => {
  let component: MyMealsComponent;
  let fixture: ComponentFixture<MyMealsComponent>;
  let firestoreSpy;
  let docSpy;
  let collectionSpy;
  let userInfoSpy;

  beforeEach(async () => {
    userInfoSpy = jasmine.createSpyObj('UserInfoService', ['getEmail']);

    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    docSpy = jasmine.createSpyObj( 'doc', [ 'collection']);
    collectionSpy = jasmine.createSpyObj( 'collection', [ 'doc', 'valueChanges' ]);

    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.doc.and.returnValue(docSpy);
    docSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.valueChanges.and.returnValue(of([{
      meal: {
        name: 'test',
        calories: 100,
        protein: 100,
        fat: 100,
        carbs: 100
      }
    }]));

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule
      ],
      declarations: [ MyMealsComponent ],
      providers: [
        {
          provide: UserInfoService,
          useValue: userInfoSpy
        },
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMealsComponent);
    component = fixture.componentInstance;
    component.searchResult = of();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
