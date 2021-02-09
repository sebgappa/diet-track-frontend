import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  public plusIcon = faPlus;
  public unsubscribe: Subject<void> = new Subject();

  constructor(private foodService: FoodService) { }

  ngOnInit() {
  }

  getFood() {
    this.foodService.getFood(123, 1, 25).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      console.log(response);
    }, () => {
      console.log("No response");
    })
  }
}
