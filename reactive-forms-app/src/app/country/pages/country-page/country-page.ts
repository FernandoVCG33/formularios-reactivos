import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {CountryService} from '../../services/country.service';
import {Country} from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
    fb= inject(FormBuilder);
    countryService= inject(CountryService);
    countryByRegion=signal<Country[]>([]);
    borders=signal<Country[]>([]);

    regions=signal(this.countryService.regions);
    myForm = this.fb.group({
      region: ['',Validators.required],
      country: ['',Validators.required],
      border: ['',Validators.required],
    });
}
