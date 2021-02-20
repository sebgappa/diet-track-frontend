import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent {
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];

  constructor(private toastrService: ToastrService, private router: Router) {

  }

  scanSuccess(event) {
    this.router.navigate(['/breakdown', { id: event }]);
  }

  scanError(event) {
    this.toastrService.error('Could not read the barcode' + event);
  }
}
