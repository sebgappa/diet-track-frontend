import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IFood } from 'src/app/models/food.model';
import { IMeal } from 'src/app/models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private store: AngularFirestore) {}

  searchForHistoryByName(email: string, searchTerm: string): Promise<IFood[]> {
    const result = [];
    const caseInsensitiveTerm = searchTerm.toLocaleLowerCase();

    const promise = new Promise<IFood[]>((resolve, reject) => {
      this.store.collection(email).doc('food').collection('history').valueChanges({ idField: 'code' }).subscribe((items) => {
        for (const item of items) {
          const caseInsesnsitiveItemName = item.product.product_name.toLowerCase();
          if (caseInsesnsitiveItemName.includes(caseInsensitiveTerm)) {
            result.push(item);
          }
        }
        return resolve(result);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }

  searchForMealByName(email: string, searchTerm: string): Promise<IMeal[]> {
    const result = [];
    const caseInsensitiveTerm = searchTerm.toLocaleLowerCase();

    const promise = new Promise<IMeal[]>((resolve, reject) => {
      this.store.collection(email).doc('food').collection('meals').valueChanges({ idField: 'id' }).subscribe((items) => {
        for (const item of items) {
          const caseInsesnsitiveItemName = item.name.toLowerCase();
          if (caseInsesnsitiveItemName.includes(caseInsensitiveTerm)) {
            result.push(item);
          }
        }
        return resolve(result);
      }, () => {
        reject(null);
      });
    });

    return promise;
  }
}
