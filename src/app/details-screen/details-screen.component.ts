import {Component, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ICountryDetails} from "../models/country-details";

@Component({
  selector: 'app-details-screen',
  templateUrl: './details-screen.component.html',
  styleUrls: ['./details-screen.component.scss']
})
export class DetailsScreenComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public country: ICountryDetails) {}
}
