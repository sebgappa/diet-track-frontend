import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tab } from 'src/app/models/tab.model';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  public tabs: Tab[] = [new Tab('calories', 'CALORIES'), new Tab('micros', 'MICROS'), new Tab('macros', 'MACROS')];
  public tabComponent = 'calories';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['calories'], { relativeTo: this.route});
  }

  showComponent(tabName: string) {
    switch (tabName) {
      case 'calories':
        this.tabComponent = 'calories';
        break;
      case 'micros':
        this.tabComponent = 'micros';
        break;
      case 'macros':
        this.tabComponent = 'macros'
        break;
    }
  }

}
