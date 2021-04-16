import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IFood } from 'src/app/models/food.model';
import { IMeal } from 'src/app/models/meal.model';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private store: AngularFirestore, private userInfo: UserInfoService) {}

  searchForHistoryByName(searchTerm: string): Promise<IFood[]> {
    const result = [];
    const caseInsensitiveTerm = searchTerm.toLocaleLowerCase();

    const promise = new Promise<IFood[]>((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('history').valueChanges({ idField: 'code' }).subscribe((items) => {
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

  searchForMealByName(searchTerm: string): Promise<IMeal[]> {
    const result = [];
    const caseInsensitiveTerm = searchTerm.toLocaleLowerCase();

    const promise = new Promise<IMeal[]>((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('meals').valueChanges({ idField: 'id' }).subscribe((items) => {
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
