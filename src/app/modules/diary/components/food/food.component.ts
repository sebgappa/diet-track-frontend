import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Tab } from 'src/app/models/tab.model';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  public cameraIcon = faCamera;
  public tabs: Tab[] = [new Tab("history", "ALL FOODS"), new Tab("whole", "WHOLE FOODS")];

  private unsubscribe: Subject<void> = new Subject();
  private meal: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['history'], { relativeTo: this.route});
  }

  searchFood(event) {
    
  }
}
