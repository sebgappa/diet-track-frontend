import { trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFood } from 'src/app/models/food.model';
import { IMeal } from 'src/app/models/meal.model';
import { Tab } from 'src/app/models/tab.model';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit, OnDestroy {
  public cameraIcon = faCamera;

  public tabs: Tab[] = [new Tab('history', 'ALL'), new Tab('whole', 'WHOLE')];
  public tabComponent = 'history';
  public pressWholeTab: Subject<void> = new Subject<void>();

  public searchPlaceholder = 'Search history!';
  public searchEnabled = true;
  public searchFor = 'history';

  public meal: string;
  public forMeal = false;

  public searchHistory: Subject<IFood[]> = new Subject<IFood[]>();
  public searchMeals: Subject<IMeal[]> = new Subject<IMeal[]>();
  public searchWhole: (string|IFood[])[];

  private unsubscribe: Subject<void> = new Subject();
  private userEmail: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private search: SearchService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
      this.userEmail = user.email;
    });

    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        if (params.has('meal')) {
          if (params.get('meal') === 'new') {
            this.forMeal = true;
          } else {
            this.tabs.push(new Tab('mymeals', 'MEALS'));
          }

          this.meal = params.get('meal');
        }
      });

    this.router.navigate(['history'], { relativeTo: this.route});
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  showComponent(tabName: string) {
    switch (tabName) {
      case 'history':
        this.tabComponent = 'history';
        this.searchPlaceholder = 'Search history!';
        this.searchEnabled = true;
        this.searchFor = 'history';
        break;
      case 'whole':
        this.tabComponent = 'whole';
        this.searchEnabled = false;
        this.searchPlaceholder = 'Select category!';
        this.pressWholeTab.next();
        break;
      case 'mymeals':
        this.tabComponent = 'mymeals';
        this.searchEnabled = true;
        this.searchPlaceholder = 'Search your meals!';
        this.searchFor = 'meals';
        break;
      default:
        break;
    }
  }

  searchFood(event) {
    if (!this.searchEnabled) {
      this.toastrService.info('Select a category to search!');
      return;
    }

    switch (this.searchFor) {
      case 'history':
        Promise.resolve(this.search.searchForHistoryByName(this.userEmail, event)).then((response) => {
          this.searchHistory.next(response);
        });
        break;
      case 'meals':
        Promise.resolve(this.search.searchForMealByName(this.userEmail, event)).then((response) => {
          this.searchMeals.next(response);
        });
        break;
      case 'vegetables':
        break;
      case 'fruits':
        break;
      case 'proteins':
        break;
      case 'fats':
        break;
      case 'carbs':
      default:
        break;
    }
  }

  updateSearchCriteria(event) {
    this.searchPlaceholder = `Search ${event}!`;
    this.searchFor = event;
    this.searchEnabled = true;
  }
}
