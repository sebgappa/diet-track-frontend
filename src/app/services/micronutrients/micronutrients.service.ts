import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MicroNutrients } from 'src/app/enums/micronutrients.enum';
import { IMicro } from 'src/app/models/micro.model';

@Injectable({
  providedIn: 'root'
})
export class MicronutrientsService {
  private micros: IMicro[];

  constructor(private store: AngularFirestore) { }

  getMicronutrients() {

  }

  setMicronutrients(email: string) {
    for(const value in MicroNutrients) {
      this.store.collection(email).doc('food').collection('breakfast').valueChanges({ idField: 'code' }).subscribe(breakfast => {
        
      });
      var micronutrient: IMicro = {
        name: MicroNutrients[value],
        total: 0,
        goal: 0,
        left: 0,
        percentage: 0
      }
    }
  }
}
