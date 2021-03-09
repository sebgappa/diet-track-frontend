import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root',
})
export class DeviceGuard implements CanActivate {
    constructor(private deviceDetectorService: DeviceDetectorService, private router: Router) {}

    canActivate(): boolean {
        const isMobile = this.deviceDetectorService.isMobile();
        if (!isMobile) {
            this.router.navigate(['/welcome']);
        }
        return isMobile;
    }
}
