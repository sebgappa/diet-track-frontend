import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root',
})
export class DesktopGuard implements CanActivate {
    constructor(private deviceDetectorService: DeviceDetectorService, private router: Router) {}

    canActivate(): boolean {
        const isDesktop = this.deviceDetectorService.isDesktop();
        if (!isDesktop) {
            this.router.navigate(['/welcome']);
        }
        return isDesktop;
    }
}
