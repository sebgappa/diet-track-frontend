import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() foodGroup: string;

  constructor() { }

  ngOnInit(): void {
    this.foodGroup = this.capitalisefirstLetter(this.foodGroup);
  }

  private capitalisefirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
