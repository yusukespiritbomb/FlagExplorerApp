import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeScreenComponent } from './home-screen.component';
import { CountryService } from '../services/country.service';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { ICountry } from '../models/country';
import { ICountryDetails } from '../models/country-details';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeScreenComponent', () => {
  let component: HomeScreenComponent;
  let fixture: ComponentFixture<HomeScreenComponent>;
  let mockCountryService: jasmine.SpyObj<CountryService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockCountries: ICountry[] = [
    { name: 'Albania', flag: 'https://flagcdn.com/w320/al.png' },
    { name: 'Algeria', flag: 'https://flagcdn.com/w320/dz.png' }
  ];

  const mockCountryDetails: ICountryDetails = {
    name: 'Albania',
    flag: 'https://flagcdn.com/w320/al.png',
    population: 2837743,
    capital: 'Tirana'
  };

  beforeEach(async () => {
    mockCountryService = jasmine.createSpyObj('CountryService', ['getCountries', 'getCountry']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [HomeScreenComponent],
      providers: [
        { provide: CountryService, useValue: mockCountryService },
        { provide: MatDialog, useValue: mockDialog }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore child components
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeScreenComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch countries on init', () => {
    mockCountryService.getCountries.and.returnValue(of(mockCountries));

    component.ngOnInit();

    expect(mockCountryService.getCountries).toHaveBeenCalled();
    expect(component.countries).toEqual(mockCountries);
  });

  it('should handle error when getCountries fails', () => {
    spyOn(console, 'error');
    mockCountryService.getCountries.and.returnValue(throwError(() => new Error('Failed')));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Failed to fetch countries', jasmine.any(Error));
  });

  it('should open dialog with country details on click', () => {
    mockCountryService.getCountry.and.returnValue(of(mockCountryDetails));

    component.onCountryClick({ name: 'Albania', flag: '' });

    expect(mockCountryService.getCountry).toHaveBeenCalledWith('Albania');
    expect(mockDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: mockCountryDetails,
      width: '400px'
    });
  });

  it('should handle error when getCountry fails', () => {
    spyOn(console, 'error');
    mockCountryService.getCountry.and.returnValue(throwError(() => new Error('Error fetching')));

    component.onCountryClick({ name: 'Albania', flag: '' });

    expect(console.error).toHaveBeenCalledWith('Failed to fetch country details', jasmine.any(Error));
  });
});
