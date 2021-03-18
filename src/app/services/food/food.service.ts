import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../../auth_config.json';
import { IFood } from 'src/app/models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly openFoodFactsURL = 'https://world.openfoodfacts.org/api/v0/product/';

  constructor(private httpClient: HttpClient) {
  }

  public getFood(barcode: number) {
    //const url = `${config.apiUri}/${this.urlSuffix}/?barcode=${barcode}`;
    const url = `${this.openFoodFactsURL}${barcode}.json`

    return this.httpClient.get<IFood>(url);
  }
}
