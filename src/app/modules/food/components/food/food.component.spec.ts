import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AuthServiceStub } from 'src/app/infrastructure/auth-stub.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FoodRoutingModule } from '../../food-routing.module';
import { HistoryComponent } from './components/history/history.component';

import { FoodComponent } from './food.component';

describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;
  let routerSpy;
  let toastrSpy;
  let firestoreSpy;
  let docSpy;
  let collectionSpy;


  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['info'])
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    docSpy = jasmine.createSpyObj( 'doc', [ 'collection']);
    collectionSpy = jasmine.createSpyObj( 'collection', [ 'doc', 'valueChanges' ]);

    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.doc.and.returnValue(docSpy);
    docSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.valueChanges.and.returnValue(of([{
      product: {
        product_name: "test",
        brands: "test",
        serving_number: 1,
        serving_size: 1,
        nutriments: {
          'energy-kcal_value': 100
        }
      }
    }]));

    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeModule,
        RouterTestingModule,
        FoodRoutingModule,
        CommonModule
      ],
      declarations: [ FoodComponent, HistoryComponent ],
      providers: [
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: ToastrService,
          useValue: toastrSpy
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
