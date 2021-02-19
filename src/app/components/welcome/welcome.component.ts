import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: [
  ]
})
export class WelcomeComponent  {
  public isMobile;

  constructor(deviceDetectorService: DeviceDetectorService) {
    this.isMobile = deviceDetectorService.isMobile();
    console.log(this.isMobile);
  }
}
