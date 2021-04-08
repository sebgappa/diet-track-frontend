import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faBarcode, faCheck } from '@fortawesome/free-solid-svg-icons';
import { BarcodeFormat } from '@zxing/library';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, OnDestroy {
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
    private route: ActivatedRoute,
    private foodService: FoodService) {
  }

  public ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(params => {
      if (params.has('meal')) {
        this.meal = params.get('meal');
      }
    });

    this.barcodeFormGroup = this.formBuilder.group({
      barcode: [null, [Validators.required, Validators.maxLength(55), Validators.pattern('^[0-9]*$')]],
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  scanSuccess(event): void {
    this.foodService.getFood(event).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      if (response.status_verbose == 'product found') {
        console.log(response.status_verbose);
        this.toastrService.success('Product found');
        this.router.navigate(['/breakdown/', this.meal, event]);
      } else {
        this.toastrService.error('Could not find product');
      }
    }, () => {
      console.log('No response from API');
    });
  }

  scanError(event): void {
    this.toastrService.error('Could not read the barcode' + event);
  }

  camerasNotFound(event): void {
    this.camera = false;
    this.toastrService.info('No camera found...');
  }

  submitBarcode(): void {
    const barcodeValue = this.barcodeFormGroup.controls.barcode.value;

    this.foodService.getFood(barcodeValue).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      if (response.status_verbose == 'product found') {
        this.toastrService.success('Product found');
        this.router.navigate(['/breakdown/', this.meal, barcodeValue]);
      } else {
        this.toastrService.error('Could not find product');
      }
    }, () => {
      console.log('No response from API');
    });
  }
}
