import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { IFood } from 'src/app/models/food.model';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let firestoreSpy;
  let docSpy;
  let collectionSpy;
  const foodMock: IFood = {
    code: '12345',
        product: {
          product_name: 'test',
          nutriments: {
            'energy-kcal_100g': null,
            'energy-kcal_value': null,
            carbohydrates_100g: null,
            carbohydrates_value: 10,
            fat_100g: 14,
            fat_value: 12,
            proteins_100g: 15,
            proteins_value: 100,
            fiber_value: 20,
            salt_value :  5,
            'saturated-fat_value': 10,
            sodium_value: 22,
            sugars_value: 20,
            calcium_value: 100,
            cholesterol_value: 50,
            iron_value: null,
            magnesium_value: null,
            zinc_value: 5,
            'trans-fat_value': 5,
            'vitamin-a_value': 10,
            'vitamin-c_value': 8,
            'vitamin-b12_value': 20,
            'vitamin-d_value': 20
          },
          brands: 'test brand 1'
        },
        status_verbose: 'product found'
  };

  beforeEach(() => {
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    docSpy = jasmine.createSpyObj( 'doc', [ 'collection']);
    collectionSpy = jasmine.createSpyObj( 'collection', [ 'doc', 'valueChanges' ]);

    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.doc.and.returnValue(docSpy);
    docSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.valueChanges.and.returnValue(of([foodMock]));

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        }
      ]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
