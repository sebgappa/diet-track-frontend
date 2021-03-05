import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: 
  [SearchBarComponent],
  imports: [
    FontAwesomeModule,
    CommonModule,
    NgbModule
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SharedModule { }
