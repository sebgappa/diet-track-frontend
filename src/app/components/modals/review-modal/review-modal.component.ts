import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss'],
  providers: [DatePipe]
})
export class ReviewModalComponent {

  public starIcon = faStar;
  public stars: number[] = [1,2,3,4,5];
  public selectedMoodValue = 0;
  public selectedAppetiteValue = 0;
  public selectedEnergyValue = 0;

    
  constructor(
    public activeModal: NgbActiveModal, 
    private store: AngularFirestore,
    private toastr: ToastrService,
    private userInfo: UserInfoService,
    private datePipe: DatePipe) {}

  countMoodStar(star) {
    this.selectedMoodValue = star;
  }

  countAppetiteStar(star) {
    this.selectedAppetiteValue = star;
  }

  countEnergyStar(star) {
    this.selectedEnergyValue = star;
  }

  submitReview() {
    let currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(this.userInfo.getEmail()).doc('review').collection('mood').doc(currentDate).set({value: this.selectedMoodValue}),
        this.store.collection(this.userInfo.getEmail()).doc('review').collection('appetite').doc(currentDate).set({value: this.selectedAppetiteValue}),
        this.store.collection(this.userInfo.getEmail()).doc('review').collection('energy').doc(currentDate).set({value: this.selectedEnergyValue}),
      ]);
      return promise;
    }).then(() => {
      this.toastr.success('Submitted review');
      this.activeModal.close();
    }, () => {
      this.toastr.error('Failed to store review');
    });
  }
}
