import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { UserInfoService } from '../user-info/user-info.service';

import { GrimReaperService } from './grim-reaper.service';

describe('GrimReaperService', () => {
  let service: GrimReaperService;

  let firestoreSpy;
  let collectionSpy;
  let docSpy;

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
    });
    service = TestBed.inject(GrimReaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
