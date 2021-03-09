import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackButtonComponent } from './back-button/back-button.component';

@NgModule({
  declarations:
  [SearchBarComponent, BackButtonComponent],
  imports: [
    FontAwesomeModule,
    CommonModule,
    NgbModule
  ],
  exports: [
    SearchBarComponent,
    BackButtonComponent
  ]
})
export class SharedModule { }
