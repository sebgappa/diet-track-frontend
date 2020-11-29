import { Component, OnInit } from '@angular/core';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public seedlingIcon = faSeedling;
  private nameClaimKey = 'name';

  constructor(
    private oAuthService: OAuthService
  ) { }

  ngOnInit() {
  }

  public get name() {
    const claims = this.oAuthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims[this.nameClaimKey];
  }

  logOut() {
    this.oAuthService.logOut();
  }
}
