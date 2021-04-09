import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
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
  public diaryMeal;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private auth: AuthService,
    private store: AngularFirestore,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        if (params.has('meal')) {
          this.diaryMeal = params.get('meal');
        }
      });

    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
      this.meals = this.store.collection(user.email).doc('food').collection('meals').valueChanges({ idField: 'id' });
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
