import { Injectable } from '@angular/core';
import { IFood } from 'src/app/models/food.model';
import { IMeal } from 'src/app/models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  public saveFoodItemToMeal(value: IFood) {
    let jSONMeal = this.readObject('meal');

    if (jSONMeal == null) {
      jSONMeal = new IMeal;
      jSONMeal.items = [value];
      this.saveObject('meal', jSONMeal);
    } else {
      const meal = new IMeal;
      Object.assign(meal, jSONMeal);

      meal.items.push(value);
      this.removeObject('meal');
      this.saveObject('meal', meal);
    }
  }

  public saveObject<T>(key: string, value: T) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  public readObject(key: string): any {
    return JSON.parse(window.sessionStorage.getItem(key));
  }

  public removeObject(key: string) {
    window.sessionStorage.removeItem(key);
  }
}
