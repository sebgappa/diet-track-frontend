import { Component, OnInit } from '@angular/core';
import { faBreadSlice, faCarrot, faCheese, faDrumstickBite, faLemon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-whole',
  templateUrl: './whole.component.html',
  styleUrls: ['./whole.component.scss']
})
export class WholeComponent implements OnInit {

  constructor() { }

  public vegetablesIcon = faCarrot;
  public fruitsIcon = faLemon;
  public meatsIcon = faDrumstickBite;
  public fatsIcon = faCheese;
  public carbsIcon = faBreadSlice;
  public foodGroupSelected = false;

  ngOnInit(): void {
  }

  selectFoodGroup() {
    this.foodGroupSelected = true;
  }

}
