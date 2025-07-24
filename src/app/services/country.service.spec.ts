import { TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICountryDetails } from '../models/country-details';
import { ICountry } from '../models/country';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP calls
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all countries', () => {
    const mockCountries: ICountry[] = [
      { name: 'Albania', flag: 'https://flagcdn.com/w320/al.png' },
      { name: 'Algeria', flag: 'https://flagcdn.com/w320/dz.png' }
    ];

    service.getCountries().subscribe((countries) => {
      expect(countries.length).toBe(2);
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne('http://localhost:5000/countries');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should fetch a single country by name', () => {
    const mockCountry: ICountryDetails = {
      name: 'Albania',
      capital: 'Tirana',
      population: 2837743,
      flag: 'https://flagcdn.com/w320/al.png'
    };

    service.getCountry('Albania').subscribe((country) => {
      expect(country).toEqual(mockCountry);
    });

    const req = httpMock.expectOne('http://localhost:5000/countries/Albania');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountry);
  });
});
