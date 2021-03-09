import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFood } from '../models/food.model';
import * as config from '../../../../../auth_config.json';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly urlSuffix = 'food';

  constructor(private httpClient: HttpClient) {
  }

  public getFood(barcode: number) {
    const url = `${config.apiUri}/${this.urlSuffix}/?barcode=${barcode}`;

    return this.httpClient.get<IFood>(url);
  }
}
