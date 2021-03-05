import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() public placeHolder: string;
  @Input() public searchbarValue: string;
  @Output() public submitSearchQuery = new EventEmitter<string>();
  public searchIcon = faSearch;

  constructor() { }

  public sendSearchQuery(searchQuery: string) {
    this.submitSearchQuery.emit(searchQuery);
  }

}
