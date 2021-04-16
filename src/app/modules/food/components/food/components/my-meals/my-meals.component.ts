import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IMeal } from 'src/app/models/meal.model';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.scss']
})
export class MyMealsComponent implements OnInit, OnDestroy {
  @Input() searchResult: Observable<IMeal[]>;

  public meals;
  public mealIcon = faUtensils;
  public diaryMeal;

  private unsubscribe: Subject<void> = new Subject();
  private eventsSubscription: Subscription;

  constructor(
    private userInfo: UserInfoService,
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

    this.store.collection(this.userInfo.getEmail()).doc('food').collection('meals').valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.unsubscribe)).subscribe(response => {
        this.meals = response;
    });

    this.eventsSubscription = this.searchResult.subscribe(result => {
      this.meals = result;
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.eventsSubscription.unsubscribe();
  }
}
