import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {

  constructor(private router: Router) {
  }

  addFood(meal: string) {
    this.router.navigate(['/food/', meal]);
  }
}
