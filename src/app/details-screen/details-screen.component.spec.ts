import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsScreenComponent } from './details-screen.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICountryDetails } from '../models/country-details';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('DetailsScreenComponent', () => {
  let component: DetailsScreenComponent;
  let fixture: ComponentFixture<DetailsScreenComponent>;

  const mockCountryData: ICountryDetails = {
    name: 'Albania',
    capital: 'Tirana',
    population: 2837743,
    flag: 'https://flagcdn.com/w320/al.png'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsScreenComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockCountryData }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the country name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Albania');
  });

  it('should display the country capital', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Tirana');
  });

  it('should display the country population', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2,837,743'); // formatted via | number
  });

  it('should display the flag image', () => {
    const imgEl: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toBe(mockCountryData.flag);
    expect(imgEl.alt).toContain('Albania');
  });
});
