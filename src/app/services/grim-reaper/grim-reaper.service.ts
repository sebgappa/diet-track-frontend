import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GrimReaperService {

  constructor() { }

  setTimer() {
    var now = new Date();
    var millisUntilClearDiary = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 49, 0, 0).getTime() - now.getTime();

    if (millisUntilClearDiary < 0) {
      millisUntilClearDiary += 86400000;
    }
    setTimeout(() => {
      this.clearDiary();
    }, millisUntilClearDiary);
  }

  clearDiary() {
    console.log("WORKING!");
  }
}
