import { CanActivate, Router } from '@angular/router';
import { DeviceService } from '../services/device.service';

export class DeviceGuard implements CanActivate {
    constructor(private deviceService: DeviceService) {}

    canActivate(): boolean {
        const isDesktop = this.deviceService.isDesktop();
        return isDesktop;
    }
}
