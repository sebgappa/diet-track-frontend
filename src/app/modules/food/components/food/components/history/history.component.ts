import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFood } from 'src/app/models/food.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public meal: string;
  public forMeal = false;
  public history = this.store.collection('history').valueChanges({ idField: 'code' });

  private unsubscribe: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private store: AngularFirestore) {
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
  }



}
