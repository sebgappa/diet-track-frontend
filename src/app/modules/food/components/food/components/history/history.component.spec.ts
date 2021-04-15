import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { AuthServiceStub } from 'src/app/infrastructure/auth-stub.component';

import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let firestoreSpy;
  let docSpy;
  let collectionSpy;

  beforeEach(waitForAsync(() => {
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

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule
      ],
      declarations: [ HistoryComponent ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
