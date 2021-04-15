import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Goals } from 'src/app/enums/goals.enum';
import { AuthServiceStub } from 'src/app/infrastructure/auth-stub.component';
import { IFood } from 'src/app/models/food.model';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FoodService } from 'src/app/services/food/food.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';

import { BreakdownComponent } from './breakdown.component';

describe('BreakdownComponent', () => {
  let component: BreakdownComponent;
  let fixture: ComponentFixture<BreakdownComponent>;
  let toastrSpy;
  let firestoreSpy;
  let routerSpy;
  let foodServiceSpy;
  let goalsServiceSpy;
  let docSpy;
  let collectionSpy;
  let sessionStorageServiceSpy;
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

  beforeEach(async () => {
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'valueChanges']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], {url: '/new'});
    foodServiceSpy = jasmine.createSpyObj('FoodService', ['getFood']);
    goalsServiceSpy = jasmine.createSpyObj('GoalsService', ['getMacroNutrientGoal']);
    sessionStorageServiceSpy = jasmine.createSpyObj('SessionStorageService', ['saveFoodItemToMeal']);

    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    docSpy = jasmine.createSpyObj( 'doc', [ 'collection', 'set']);
    collectionSpy = jasmine.createSpyObj( 'collection', [ 'doc', 'add' ]);

    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.doc.and.returnValue(docSpy);
    docSpy.collection.and.returnValue(collectionSpy);
    docSpy.set.and.returnValue(Promise.resolve(true));

    foodServiceSpy.getFood.and.returnValue(of(foodMock));
    goalsServiceSpy.getMacroNutrientGoal.and.returnValue(100);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        SharedModule,
        FontAwesomeModule,
        ChartsModule
      ],
      declarations: [ BreakdownComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ meal: 'breakfast', id: '12345' }))
          },
        },
        {
          provide: ToastrService,
          useValue: toastrSpy
        },
        {
          provide: AngularFirestore,
          useValue: firestoreSpy
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: FoodService,
          useValue: foodServiceSpy
        },
        {
          provide: GoalsService,
          useValue: goalsServiceSpy
        },
        {
          provide: SessionStorageService,
          useValue: sessionStorageServiceSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set for meal property to true if present in url', () => {
    expect(component.forMeal).toBeTrue();
  });

  it('should set barcode and meal if present in param map', () => {
    expect(component.meal).toEqual('breakfast');
    expect(component.barcode).toEqual('12345');
  });

  it('should call to getFood from the food service', () => {
    expect(foodServiceSpy.getFood).toHaveBeenCalledTimes(1);
  });

  it('it should default null values from response to 0', () => {
    expect(component.foodObject.product.nutriments['energy-kcal_100g']).toEqual(0);
    expect(component.foodObject.product.nutriments['energy-kcal_value']).toEqual(0);
    expect(component.foodObject.product.nutriments.carbohydrates_100g).toEqual(0);
    expect(component.foodObject.product.nutriments.iron_value).toEqual(0);
    expect(component.foodObject.product.nutriments.magnesium_value).toEqual(0);
  });

  it('should set the macronutrient values from response', () => {
    expect(component.macronutrients).toEqual(
      [foodMock.product.nutriments.proteins_100g,
       foodMock.product.nutriments.fat_100g,
       0,
       0]);

    expect(component.originalMacronutrients).toEqual(
      [foodMock.product.nutriments.proteins_100g,
        foodMock.product.nutriments.fat_100g,
        0,
        0]);
  });

  describe('calculatePercentageOfMacronutrientGoal', () => {
    it('should call the goals service with the value of goal it needs', () => {
      component.calculatePercentageOfMacronutrientGoal(1, Goals.protein);
      expect(goalsServiceSpy.getMacroNutrientGoal).toHaveBeenCalledWith(Goals.protein);
    });

    it('should calculate the correct percentages for given a normal set of values', () => {
      goalsServiceSpy.getMacroNutrientGoal.and.returnValue(105);
      expect(component.calculatePercentageOfMacronutrientGoal(43, Goals.protein)).toEqual(41);
    });

    it('should calculate the correct percentages for given a decimal set of values', () => {
      goalsServiceSpy.getMacroNutrientGoal.and.returnValue(205);
      expect(component.calculatePercentageOfMacronutrientGoal(23.55, Goals.protein)).toEqual(11);
    });

    it('should handle the case where foodvalue is negative and return 0', () => {
      goalsServiceSpy.getMacroNutrientGoal.and.returnValue(205);
      expect(component.calculatePercentageOfMacronutrientGoal(-10, Goals.protein)).toEqual(0);
    });

    it('should handle the case where percentage is greater than 100 and return 100', () => {
      goalsServiceSpy.getMacroNutrientGoal.and.returnValue(205);
      expect(component.calculatePercentageOfMacronutrientGoal(300, Goals.protein)).toEqual(100);
    });
  });

  describe('updateMacroServingSize', () => {
    it('if selection is 100 and current selection is 100 change nothing', () => {
      component.updateMacroServingSize();

      expect(component.macronutrients).toEqual(
        [15,
         14,
         0,
         0]);

      expect(component.originalMacronutrients).toEqual(
        [15,
          14,
          0,
          0]);

      expect(component.macronutrientGoalPercentages).toEqual(
        [15,
          14,
          0,
          0]);
    });

    it('if selection is 100 and current selection is 10 times by 10', () => {
      component.currentServingSizeSelection = '10';
      component.updateMacroServingSize();
      expect(component.macronutrients).toEqual(
          [150,
           140,
           0,
           0]);

      expect(component.originalMacronutrients).toEqual(
          [150,
            140,
            0,
            0]);

      expect(goalsServiceSpy.getMacroNutrientGoal).toHaveBeenCalledTimes(4);

      expect(component.macronutrientGoalPercentages).toEqual(
          [100,
            100,
            0,
            0]);
    });

    it('if selection is 100 and current selection is 1 times by 100', () => {
      component.currentServingSizeSelection = '1';
      component.updateMacroServingSize();
      expect(component.macronutrients).toEqual(
          [1500,
           1400,
           0,
           0]);

      expect(component.originalMacronutrients).toEqual(
          [1500,
            1400,
            0,
            0]);

      expect(goalsServiceSpy.getMacroNutrientGoal).toHaveBeenCalledTimes(4);

      expect(component.macronutrientGoalPercentages).toEqual(
          [100,
            100,
            0,
            0]);
    });

    it('if selection is 10 and current selection is 100 divide by 10', () => {
      component.nutritionBreakdownForm.controls.servingSize.setValue('10');
      component.updateMacroServingSize();

      expect(component.macronutrients).toEqual(
        [1.5,
         1.4,
         0,
         0]);

      expect(component.originalMacronutrients).toEqual(
        [1.5,
          1.4,
          0,
          0]);

      expect(goalsServiceSpy.getMacroNutrientGoal).toHaveBeenCalledTimes(4);

      expect(component.macronutrientGoalPercentages).toEqual(
        [2,
          1,
          0,
          0]);
    });

    it('if selection is 10 and current selection is 1 times by 10', () => {
      component.currentServingSizeSelection = '1';
      component.nutritionBreakdownForm.controls.servingSize.setValue('10');
      component.updateMacroServingSize();

      expect(component.macronutrients).toEqual(
        [150,
         140,
         0,
         0]);

      expect(component.originalMacronutrients).toEqual(
        [150,
          140,
          0,
          0]);

      expect(goalsServiceSpy.getMacroNutrientGoal).toHaveBeenCalledTimes(4);

      expect(component.macronutrientGoalPercentages).toEqual(
        [100,
          100,
          0,
          0]);
    });

    it('if selection is 1 and current selection is 100 divide by 100', () => {
      component.nutritionBreakdownForm.controls.servingSize.setValue('1');
      component.updateMacroServingSize();

      expect(component.macronutrients).toEqual(
        [0.15,
         0.14,
         0,
         0]);

      expect(component.originalMacronutrients).toEqual(
        [0.15,
          0.14,
          0,
          0]);

      expect(goalsServiceSpy.getMacroNutrientGoal).toHaveBeenCalledTimes(4);

      expect(component.macronutrientGoalPercentages).toEqual(
        [0,
          0,
          0,
          0]);
    });

    it('if selection is 1 and current selection is 10 divide by 10', () => {
      component.currentServingSizeSelection = '10';
      component.nutritionBreakdownForm.controls.servingSize.setValue('1');
      component.updateMacroServingSize();

      expect(component.macronutrients).toEqual(
        [1.5,
         1.4,
         0,
         0]);

      expect(component.originalMacronutrients).toEqual(
        [1.5,
          1.4,
          0,
          0]);

      expect(goalsServiceSpy.getMacroNutrientGoal).toHaveBeenCalledTimes(4);

      expect(component.macronutrientGoalPercentages).toEqual(
        [2,
          1,
          0,
          0]);
    });
  });

  describe('updateMacroServingSize', () => {
    it('should not change macronutrient values if number is greater than 10,000', () => {
      component.nutritionBreakdownForm.controls.numOfServings.setValue(10001);
      component.updateMacroServingSize();

      expect(component.macronutrients).toEqual(
        [15,
         14,
         0,
         0]);

      expect(component.macronutrientGoalPercentages).toEqual(
        [15,
          14,
          0,
          0]);
    });

    it('should set correct macronutrient values for valid serving size', () => {
      component.nutritionBreakdownForm.controls.numOfServings.setValue(10);
      component.updateMacroServingSize();

      expect(component.macronutrients).toEqual(
        [150,
         140,
         0,
         0]);

      expect(component.macronutrientGoalPercentages).toEqual(
        [100,
          100,
          0,
          0]);
    });
  });

  describe('addFoodItem', () => {
    it('should trim product name if longer than 30 characters', () => {
      component.foodObject.product.product_name = 'thisisaproductnamethatislongerthan30characters';
      component.addFoodItem();
      expect(component.foodObject.product.product_name).toEqual('thisisaproductnamethatislonger...');
    });

    it('should trim brands if longer than 30 characters', () => {
      component.foodObject.product.brands = 'thisisabrandnamethatislongerthan30characters';
      component.addFoodItem();
      expect(component.foodObject.product.brands).toEqual('thisisabrandnamethatislongerth...');
    });

    it('should perform correct actions for adding meal if successful', () => {
      component.addFoodItem();
      fixture.whenStable().then(() => {
        expect(toastrSpy.success).toHaveBeenCalledTimes(1);
        expect(routerSpy.navigate).toHaveBeenCalledOnceWith([ '/food/', 'breakfast' ]);
      });
    });
  });

  describe('addFoodItemForMeal', () => {
    it('should trim product name if longer than 30 characters', () => {
      component.foodObject.product.product_name = 'thisisaproductnamethatislongerthan30characters';
      component.addFoodItemForMeal();
      expect(component.foodObject.product.product_name).toEqual('thisisaproductnamethatislonger...');
    });

    it('should trim brands if longer than 30 characters', () => {
      component.foodObject.product.brands = 'thisisabrandnamethatislongerthan30characters';
      component.addFoodItemForMeal();
      expect(component.foodObject.product.brands).toEqual('thisisabrandnamethatislongerth...');
    });

    it('should perform correct actions for adding meal if successful', () => {
      component.addFoodItemForMeal();
      fixture.whenStable().then(() => {
        expect(toastrSpy.success).toHaveBeenCalledTimes(1);
        expect(sessionStorageServiceSpy.saveFoodItemToMeal).toHaveBeenCalledTimes(1);
        expect(routerSpy.navigate).toHaveBeenCalledOnceWith([ '/food/', 'breakfast' ]);
      });
    });
  });
});
