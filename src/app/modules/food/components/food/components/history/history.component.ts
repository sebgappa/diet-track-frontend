import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFood } from 'src/app/models/food.model';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  @Input() searchResult: Observable<IFood[]>;

  public meal: string;
  public forMeal = false;
  public history;
  public historyIcon = faBook;

  private unsubscribe: Subject<void> = new Subject();
  private eventsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: AngularFirestore,
    private userInfo: UserInfoService) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        if (params.has('meal')) {
          if (params.get('meal') === 'new') {
            this.forMeal = true;
          }

          this.meal = params.get('meal');
        }
      });


    this.store.collection(this.userInfo.getEmail()).doc('food').collection('history').valueChanges({ idField: 'code' })
      .pipe(takeUntil(this.unsubscribe)).subscribe(response => {
        this.history = response;
      });

    this.eventsSubscription = this.searchResult.subscribe(result => {
      this.history = result;
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.eventsSubscription.unsubscribe();
  }
}
