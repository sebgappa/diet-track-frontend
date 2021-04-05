import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public meal: string;
  public forMeal = false;
  public history;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute, 
    private store: AngularFirestore,
    private auth: AuthService) {
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

      this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
        this.history = this.store.collection(user.email).doc('food').collection('history').valueChanges({ idField: 'code' });
      });
  }
}
