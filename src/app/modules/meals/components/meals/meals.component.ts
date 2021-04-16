import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '@auth0/auth0-angular';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

  public plusIcon = faPlus;
  public meals;
  public noMeals = false;

  private unsubscribe: Subject<void> = new Subject();
  private userEmail: string;

  constructor(private store: AngularFirestore,
              private userInfo: UserInfoService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.userEmail = this.userInfo.getEmail();

    this.meals = this.store.collection(this.userEmail).doc('food').collection('meals').valueChanges({ idField: 'id' });
    this.store.collection(this.userEmail).doc('food').collection('meals').valueChanges({ idField: 'id' }).subscribe((response) => {
      if (response.length == 0) {
        this.noMeals = true;
      }
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public deleteMeal(id: string) {
    this.store.collection(this.userEmail).doc('food').collection('meals').doc(id).delete().then(() => {
      this.toastr.success("Meal deleted");
    }, () => {
      this.toastr.error("Failed to delete meal")
    })
  }
}
