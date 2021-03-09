import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faBreadSlice, faCarrot, faCheese, faDrumstickBite, faLemon } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-whole',
  templateUrl: './whole.component.html',
  styleUrls: ['./whole.component.scss']
})
export class WholeComponent implements OnInit, OnDestroy {

  @Output() newSearchCriteriaEvent = new EventEmitter<string>();
  @Input() wholeTabPressed: Observable<void>;

  private eventsSubscription: Subscription;

  constructor() { }

  public vegetablesIcon = faCarrot;
  public fruitsIcon = faLemon;
  public meatsIcon = faDrumstickBite;
  public fatsIcon = faCheese;
  public carbsIcon = faBreadSlice;
  public foodGroupSelected = false;
  public foodGroup: string;

  ngOnInit(): void {
    this.eventsSubscription = this.wholeTabPressed.subscribe(() => this.foodGroupSelected = false);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  selectFoodGroup(foodGroup: string) {
    this.foodGroup = foodGroup;
    this.foodGroupSelected = true;
    this.newSearchCriteriaEvent.emit(foodGroup);
  }
}
