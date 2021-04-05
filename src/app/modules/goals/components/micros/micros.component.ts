import { Component, OnInit } from '@angular/core';
import { IMicro } from 'src/app/models/micro.model';
import { MicronutrientsService } from 'src/app/services/micronutrients/micronutrients.service';

@Component({
  selector: 'app-micros',
  templateUrl: './micros.component.html',
  styleUrls: ['./micros.component.scss']
})
export class MicrosComponent implements OnInit {

  public micros: IMicro[];

  constructor(private micronutrients: MicronutrientsService) { }

  ngOnInit(): void {
  }

}
