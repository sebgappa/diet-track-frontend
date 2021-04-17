import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CaloriesService } from './services/calories/calories.service';
import { GrimReaperService } from './services/grim-reaper/grim-reaper.service';
import { ReviewService } from './services/review/review.service';
import { UserInfoService } from './services/user-info/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private userInfo: UserInfoService, 
    private auth: AuthService,
    private grimReaper: GrimReaperService,
    private review: ReviewService) {}

  ngOnInit(): void {
    this.auth.user$.pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
      if(user) {
        this.userInfo.setEmail(user.email);
        this.grimReaper.checkClearDiary();
        this.review.setTimer();
      }
    })
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

