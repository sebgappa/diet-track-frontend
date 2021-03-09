import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {

  @Input() public returnRoute: string;

  public arrowLeftIcon = faArrowLeft;

  constructor(private router: Router) { }

  public back() {
    this.router.navigate([this.returnRoute]);
  }


}
