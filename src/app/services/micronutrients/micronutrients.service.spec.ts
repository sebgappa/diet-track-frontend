import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { GoalsService } from '../goals/goals.service';
import { UserInfoService } from '../user-info/user-info.service';

import { MicronutrientsService } from './micronutrients.service';

describe('MicronutrientsService', () => {
  let service: MicronutrientsService;
  let firestoreSpy;
  let docSpy;
  let collectionSpy;
  let userInfoSpy;
  let goalsServiceSpy;


  beforeEach(() => {
    userInfoSpy = jasmine.createSpyObj('UserInfoService', ['getEmail']);
    goalsServiceSpy = jasmine.createSpyObj('GoalsService', ['getRecommendedMicroNutrientGoals'])

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

    TestBed.configureTestingModule({
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
          provide: GoalsService,
          useValue: goalsServiceSpy
        }
      ]
    });
    service = TestBed.inject(MicronutrientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
