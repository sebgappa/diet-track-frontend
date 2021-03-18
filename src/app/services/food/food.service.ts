import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFood } from 'src/app/models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly openFoodFactsURL = 'https://world.openfoodfacts.org/api/v0/product/';

  constructor(private httpClient: HttpClient) {
  }

  public getFood(barcode: number) {
    const url = `${this.openFoodFactsURL}${barcode}.json`

    return this.httpClient.get<IFood>(url);
  }
}
