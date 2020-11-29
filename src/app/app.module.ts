import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { InitialAuthService } from './services/initial-auth.service';
import { authConfig } from './app-auth-config';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    InitialAuthService,
    { provide: AuthConfig, useValue: authConfig },
    {
      provide: APP_INITIALIZER,
      useFactory: (initialAuthService: InitialAuthService) => () => initialAuthService.initAuth(),
      deps: [InitialAuthService],
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
