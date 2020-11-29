import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent {
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];

  constructor(private toastrService: ToastrService) {

  }

  scanSuccess(event) {
    this.toastrService.success('The barcode value is: ' + event);
  }

  scanError(event) {
    this.toastrService.error('Could not read the barcode' + event);
  }
}
