import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { UserInfoService } from '../user-info/user-info.service';

import { MacronutrientsService } from './macronutrients.service';

describe('MacronutrientsService', () => {
  let service: MacronutrientsService;
  let firestoreSpy;
  let docSpy;
  let collectionSpy;
  let userInfoSpy;


  beforeEach(() => {
    userInfoSpy = jasmine.createSpyObj('UserInforService', ['getEmail']);

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
        }
      ]
    });
    service = TestBed.inject(MacronutrientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
