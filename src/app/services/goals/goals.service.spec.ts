import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { UserInfoService } from '../user-info/user-info.service';

import { GoalsService } from './goals.service';

describe('GoalsService', () => {
  let service: GoalsService;
  let firestoreSpy;
  let docSpy;
  let collectionSpy;
  let userInfoSpy;

  beforeEach(() => {
    userInfoSpy = jasmine.createSpyObj('UserInfoService', ['getEmail']);

    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    docSpy = jasmine.createSpyObj( 'doc', [ 'collection', 'get']);
    collectionSpy = jasmine.createSpyObj( 'collection', [ 'doc', 'valueChanges' ]);

    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.doc.and.returnValue(docSpy);
    docSpy.collection.and.returnValue(collectionSpy);
    docSpy.get.and.returnValue(of());

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
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
    service = TestBed.inject(GoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
