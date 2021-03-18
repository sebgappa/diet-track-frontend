import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFood } from 'src/app/models/food.model';

@Component({
  selector: 'app-whole-list',
  templateUrl: './whole-list.component.html',
  styleUrls: ['./whole-list.component.scss']
})
export class WholeListComponent implements OnInit {
  
  @Input() foodGroup: string;
  public meal: string;
  public forMeal: boolean = false;
  public foods: IFood[] = [];

  private unsubscribe: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.foodGroup = this.capitalisefirstLetter(this.foodGroup);

    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => {
        if (params.has('meal')) {
          if(params.get('meal') === 'new') {
            this.forMeal = true;
          }

          this.meal = params.get('meal')        
        }
      });
  }

  private capitalisefirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
