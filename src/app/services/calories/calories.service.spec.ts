import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { CaloriesService } from './calories.service';

describe('CaloriesService', () => {
  let service: CaloriesService;
  let firestoreSpy;


  beforeEach(() => {
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'valueChanges'])


    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        }
      ]
    });
    service = TestBed.inject(CaloriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
