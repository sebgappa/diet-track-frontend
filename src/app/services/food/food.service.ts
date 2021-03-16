import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../../auth_config.json';
import { IFood } from 'src/app/models/food.model';

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
