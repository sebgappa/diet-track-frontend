import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faBarcode, faCheck } from '@fortawesome/free-solid-svg-icons';
import { BarcodeFormat } from '@zxing/library';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  public allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
  public barcodeIcon = faBarcode;
  public tickIcon = faCheck;

  public meal: string;

  public get barcodeForm() { return this.barcodeFormGroup.controls; }
  public barcodeFormGroup: FormGroup;
  public camera = true;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(params => {
      if (params.has('meal')) {
        this.meal = params.get('meal')        
      }
    });

    this.barcodeFormGroup = this.formBuilder.group({
      barcode: [null, [Validators.required, Validators.maxLength(55), Validators.pattern('^[0-9]*$')]],
    });
  }

  scanSuccess(event): void {
    this.toastrService.success('Barcode value read!');
    this.router.navigate(['/breakdown/', event]);
  }

  scanError(event): void {
    this.toastrService.error('Could not read the barcode' + event);
  }

  camerasNotFound(event): void {
    this.camera = false;
    this.toastrService.info('No camera found...');
  }

  submitBarcode(): void {
    this.router.navigate(['/breakdown/', this.meal, this.barcodeFormGroup.controls.barcode.value]);
  }
}
