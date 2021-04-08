import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '@auth0/auth0-angular';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {

  public plusIcon = faPlus;
  public meals;
  public noMeals = false;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private store: AngularFirestore,
              private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
      this.meals = this.store.collection(user.email).doc('food').collection('meals').valueChanges({ idField: 'id' });
      this.store.collection(user.email).doc('food').collection('meals').valueChanges({ idField: 'id' }).subscribe((response) => {
        if(response.length == 0) {
          this.noMeals = true;
        }
      })
    })
  }
}
