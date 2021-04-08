import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '@auth0/auth0-angular';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.scss']
})
export class MyMealsComponent implements OnInit, OnDestroy {

  public meals;
  public mealIcon = faUtensils;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private auth: AuthService,
    private store: AngularFirestore) { }

  ngOnInit(): void {
    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
      this.meals = this.store.collection(user.email).doc('food').collection('meals').valueChanges({ idField: 'id' });
    })
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
