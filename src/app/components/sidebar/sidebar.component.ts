import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBook, faBullseye, faChevronLeft, faChevronRight, faUtensils } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() public closeSidebar = new EventEmitter<boolean>();
  public collapse: boolean;

  public openSidebarIcon = faChevronRight;
  public closeSidebarIcon = faChevronLeft;
  public diaryIcon = faBook;
  public goalIcon = faBullseye;
  public mealIcon = faUtensils;

  constructor() { }

  ngOnInit() {
  }

  public getSidebarClass() {
    if (this.collapse) {
      return 'closed';
    } else {
      return 'open';
    }
  }

  public collapseSideBarClicked() {
    this.collapse = !this.collapse;
    this.closeSidebar.emit(this.collapse);
  }
}
