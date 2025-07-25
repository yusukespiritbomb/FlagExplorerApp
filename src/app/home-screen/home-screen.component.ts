import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICountry } from "../models/country";
import { ICountryDetails } from "../models/country-details";
import { MatDialog } from '@angular/material/dialog';
import { DetailsScreenComponent } from "../details-screen/details-screen.component";
import { CountryService } from "../services/country.service";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  countries: ICountry[] = [];
  selectedCountry: ICountryDetails | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog, private countryService: CountryService) {}

  public ngOnInit(): void {
    const countriesSub = this.countryService.getCountries().subscribe({
      next: (countries: ICountry[]) => {
        this.countries = countries;
      },
      error: (err) => {
        console.error('Failed to fetch countries', err);
      }
    });

    this.subscriptions.add(countriesSub);
  }

  public onCountryClick(country: ICountry) {
    const countrySub = this.countryService.getCountry(country.name).subscribe({
      next: (details: ICountryDetails) => {
        this.selectedCountry = details;
        this.dialog.open(DetailsScreenComponent, {
          data: details,
          width: '400px',
        });
      },
      error: (err) => {
        console.error('Failed to fetch country details', err);
      }
    });

    this.subscriptions.add(countrySub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
