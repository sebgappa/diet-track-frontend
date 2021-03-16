import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whole-list',
  templateUrl: './whole-list.component.html',
  styleUrls: ['./whole-list.component.scss']
})
export class WholeListComponent implements OnInit {

  @Input() foodGroup: string;

  constructor() { }

  ngOnInit(): void {
    this.foodGroup = this.capitalisefirstLetter(this.foodGroup);
  }

  private capitalisefirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
