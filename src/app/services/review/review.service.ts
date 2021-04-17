import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewModalComponent } from 'src/app/components/modals/review-modal/review-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private modalService: NgbModal) { }

  setTimer() {
    var now = new Date();
    var millisUntilReview = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0).getTime() - now.getTime();

    if (millisUntilReview < 0) {
      millisUntilReview += 86400000;
    }
    
    setTimeout(() => {
      this.displayReview()
    }, millisUntilReview);
  }

  displayReview() {
    this.modalService.open(ReviewModalComponent);
  }
}
