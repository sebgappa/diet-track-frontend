import { DeviceDetectorService } from 'ngx-device-detector';

export class DeviceService {

    constructor(private deviceDetectorService: DeviceDetectorService) {}

    public isDesktop(): boolean {
        if (this.deviceDetectorService.isDesktop) {
            return true;
        }
        return false;
    }
}
