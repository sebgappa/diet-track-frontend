import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFood } from 'src/app/models/food.model';
import { CachingService } from '../caching/caching.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly openFoodFactsURL = 'https://world.openfoodfacts.org/api/v0/product/';

  constructor(private httpClient: HttpClient, private cache: CachingService) {
  }

  public getFood(barcode: string) {
    const url = `${this.openFoodFactsURL}${barcode}.json`;

    return this.cache.cacheData(
      this.httpClient.get<IFood>(url), 'openFoodFacts', url, `${barcode}.json`);
  }
}
