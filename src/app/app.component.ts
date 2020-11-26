import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public closeSidebar = false;

  public setSidebarState(closeSidebar) {
    this.closeSidebar = closeSidebar;
  }

  public getSidebarState() {
    if (this.closeSidebar) {
      return 'sidebar-close';
    } else {
      return 'sidebar-open';
    }
  }
}
