import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Tab } from 'src/app/models/tab.model';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit, OnDestroy {
  public cameraIcon = faCamera;

  public tabs: Tab[] = [new Tab('history', 'ALL FOODS'), new Tab('whole', 'WHOLE FOODS')];
  public tabComponent = 'history';
  public pressWholeTab: Subject<void> = new Subject<void>();

  public searchPlaceholder = 'Search history!';
  public searchEnabled = true;

  public meal: string;
  public forMeal: boolean = false;

  private unsubscribe: Subject<void> = new Subject();


  constructor(private route: ActivatedRoute, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        if (params.has('meal')) {
          if(params.get('meal') === 'new') {
            this.forMeal = true;
          }

          this.meal = params.get('meal').toLocaleUpperCase();
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
        break;
      case 'whole':
        this.tabComponent = 'whole';
        this.searchEnabled = false;
        this.searchPlaceholder = 'Select category!';
        this.pressWholeTab.next();
    }
  }

  searchFood(event) {
    if (!this.searchEnabled) {
      this.toastrService.info('Select a category to search!');
      return;
    }
  }

  updateSearchCriteria(event) {
    this.searchPlaceholder = `Search ${event}!`;
    this.searchEnabled = true;
  }
}
