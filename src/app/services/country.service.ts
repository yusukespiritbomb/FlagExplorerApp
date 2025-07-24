import { Injectable } from '@angular/core';
import {ICountryDetails} from "../models/country-details";
import {DetailsScreenComponent} from "../details-screen/details-screen.component";
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {ICountry} from "../models/country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }
  public getCountry(country: string): Observable<ICountryDetails> {
    return this.http.get<ICountryDetails>('http://localhost:5000/countries/' + country);
  }

  public getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('http://localhost:5000/countries');
  }

}
