import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Calories } from 'src/app/enums/calories.enum';
import { IMeal } from 'src/app/models/meal.model';
import { GoalsService } from '../goals/goals.service';

import { CaloriesService } from './calories.service';

describe('CaloriesService', () => {
  let service: CaloriesService;
  let firestoreSpy;
  let docSpy;
  let collectionSpy;
  let goalsServiceSpy;
  let mealMock: IMeal;

  beforeEach(() => {
    mealMock = {
      name: "test",
      items: [{
        code: '12345',
          product: {
            product_name: 'test',
            nutriments: {
              'energy-kcal_100g': null,
              'energy-kcal_value': 100,
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
            brands: "test brand 1"
          },
          status_verbose: "product found"
      }]
    }

    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    docSpy = jasmine.createSpyObj( 'doc', [ 'collection']);
    collectionSpy = jasmine.createSpyObj( 'collection', [ 'doc', 'valueChanges' ]);
    
    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.doc.and.returnValue(docSpy);
    docSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.valueChanges.and.returnValue(of(mealMock.items));
    
    goalsServiceSpy = jasmine.createSpyObj('GoalsService', ['getMacroNutrientGoal']);
    
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: GoalsService,
          useValue: goalsServiceSpy
        }
      ]
    });
    service = TestBed.inject(CaloriesService);
    service.caloriesConsumedPerMeal = [10, 20, 30, 40];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCaloriesConsumedPerMeal', () => {
    it('should retrieve calories for breakfast', () => {
      expect(service.getCaloriesConsumedPerMeal(Calories.breakfast)).toEqual(10);
    });

    it('should retrieve calories for lunch', () => {
      expect(service.getCaloriesConsumedPerMeal(Calories.lunch)).toEqual(20);
    });

    it('should retrieve calories for dinner', () => {
      expect(service.getCaloriesConsumedPerMeal(Calories.dinner)).toEqual(30);
    });

    it('should retrieve calories for snacks', () => {
      expect(service.getCaloriesConsumedPerMeal(Calories.snacks)).toEqual(40);
    });
  });

  describe('getTotalCaloriesConsumed', () => {
    it('should correctly sum total calories', () => {
      expect(service.getTotalCaloriesConsumed()).toEqual(100);
    });
  })

  describe('getRemainingCalories', () => {
    it('should return correct remaining calories', () => {
      goalsServiceSpy.getMacroNutrientGoal.and.returnValue(200);
      expect(service.getRemainingCalories()).toEqual(100);
    });
  })

  describe('getTotalCaloriesInMeal', () => {
    it('should return total calories in meal', () => {
      service.caloriesInMeal = 55;
      expect(service.getTotalCaloriesInMeal()).toEqual(55);
    });
  });

  describe('setMealCalories', () => {
    it('should not increment calories if there are no items in meal', () => {
      mealMock.items = null;
      service.setMealCalories(mealMock);
      expect(service.caloriesInMeal).toEqual(0);
    });

    it('should increment calories if there are items in meal', () => {
      service.caloriesInMeal = 0;
      service.setMealCalories(mealMock);
      expect(service.caloriesInMeal).toEqual(100);
    });
  });

  describe('clearMealCalories', () => {
    it('should clear total meal clories', () => {
      service.caloriesInMeal = 100;
      service.clearMealCalories();
      expect(service.caloriesInMeal).toEqual(0);
    })
  });

  describe('setBreakfastCalories', () => {
    it('should set breakfast calories', () => {
      service.setBreakfastCalories('test');
      expect(service.caloriesConsumedPerMeal[0]).toEqual(100);
    });
  });
  
    describe('setLunchCalories', () => {
      it('should set lunch calories', () => {
        service.setLunchCalories('test');
        expect(service.caloriesConsumedPerMeal[1]).toEqual(100);
      });
    });
  
  describe('setDinnerCalories', () => {
    it('should set dinner calories', () => {
      service.setDinnerCalories('test');
      expect(service.caloriesConsumedPerMeal[2]).toEqual(100);
    });
  });

  describe('setSnacksCalories', () => {
    it('should set snacks calories', () => {
      service.setSnacksCalories('test');
      expect(service.caloriesConsumedPerMeal[3]).toEqual(100);
    });
  });
});
