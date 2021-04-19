import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class GrimReaperService {

  private lastWipeDate: Date;
  constructor(private store: AngularFirestore, private userInfo: UserInfoService) { }

  checkClearDiary() {
    Promise.resolve(this.fetchLastWipe()).then(() => {
      let now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      if (this.lastWipeDate < now) {
        this.clearDiary()
      }
    })
  }

  clearDiary(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.store.firestore.runTransaction(() => {
        const promise = Promise.all([
          this.clearBreakfastEntries(),
          this.clearLunchEntries(),
          this.clearDinnerEntries(),
          this.clearSnacksEntries()
        ]);
        return promise;
      }).then(() => {
        let now = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
        this.store.collection(this.userInfo.getEmail()).doc('lastWipe').set({value: now.toString()}).then(() => {
          resolve(null);
        });
      }, () => {
        console.log("Failed to clear diary.")
        reject(null);
      });
    })
    return promise;
  }

  fetchLastWipe(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('lastWipe').get().subscribe((date: any) => {
        if (date.data()) {
          this.lastWipeDate = new Date(date.data().value);
          resolve(null);
        }
        reject(null);
      }, () => {
        reject(null);
      })
    })

    return promise;
  }

  clearBreakfastEntries(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('breakfast').valueChanges({ idField: 'id' }).subscribe((items) => {
        const promises = [];
  
        for (const food of items) {
          promises.push(this.store.collection(this.userInfo.getEmail()).doc('food').collection('breakfast').doc(food.id).delete());
        }
  
        this.store.firestore.runTransaction(() => {
          return Promise.all(promises);
        }).then(() => {
          resolve(null);
        }, () => {
          reject(null);
        });
      })
    })
    return promise;
  }

  clearLunchEntries(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('lunch').valueChanges({ idField: 'id' }).subscribe((items) => {
        const promises = [];
  
        for (const food of items) {
          promises.push(this.store.collection(this.userInfo.getEmail()).doc('food').collection('lunch').doc(food.id).delete());
        }
  
        this.store.firestore.runTransaction(() => {
          return Promise.all(promises);
        }).then(() => {
          resolve(null);
        }, () => {
          reject(null);
        });
      })
    })
    return promise;
  }

  clearDinnerEntries(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('dinner').valueChanges({ idField: 'id' }).subscribe((items) => {
        const promises = [];
  
        for (const food of items) {
          promises.push(this.store.collection(this.userInfo.getEmail()).doc('food').collection('dinner').doc(food.id).delete());
        }
  
        this.store.firestore.runTransaction(() => {
          return Promise.all(promises);
        }).then(() => {
          resolve(null);
        }, () => {
          reject(null);
        });
      })
    })
    return promise;
  }

  clearSnacksEntries(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.store.collection(this.userInfo.getEmail()).doc('food').collection('snacks').valueChanges({ idField: 'id' }).subscribe((items) => {
        const promises = [];
  
        for (const food of items) {
          promises.push(this.store.collection(this.userInfo.getEmail()).doc('food').collection('snacks').doc(food.id).delete());
        }
  
        this.store.firestore.runTransaction(() => {
          return Promise.all(promises);
        }).then(() => {
          resolve(null);
        }, () => {
          reject(null);
        });
      })
    })
    return promise;
  }
}
