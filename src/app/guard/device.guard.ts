import { CanActivate, Router } from '@angular/router';
import { DeviceService } from '../services/device.service';

export class DeviceGuard implements CanActivate {
    constructor(private _deviceService: DeviceService) {}

    canActivate(): boolean {
        const isDesktop = this._deviceService.isDesktop();
        return isDesktop;
    }
}