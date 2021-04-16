import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserInfoService } from './services/user-info/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private unsubscribe: Subject<void> = new Subject();

  constructor(private userInfo: UserInfoService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
      if(user) {
        this.userInfo.setEmail(user.email);
      }
    })

    var now = new Date();
    var millisUntilClearDiary = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 59, 0, 0).getTime() - now.getTime();
    var millisUntilReview = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0).getTime() - now.getTime();

    if (millisUntilClearDiary < 0) {
      millisUntilClearDiary += 86400000;
    }

    if (millisUntilReview < 0) {
      millisUntilReview += 86400000;
    }

    setTimeout(function(){
      
    }, millisUntilClearDiary);

    setTimeout(function(){
      
    }, millisUntilReview);
  }

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

function intervalTest() {
  console.log("WORKING")
}

