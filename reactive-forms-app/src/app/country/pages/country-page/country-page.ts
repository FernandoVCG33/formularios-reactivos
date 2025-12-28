import {Component, effect, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {CountryService} from '../../services/country.service';
import {Country} from '../../interfaces/country.interface';
import {filter, switchMap, tap} from 'rxjs';

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

    onformChabged=effect(
      (onCleanup)=>{
        const regionSusbcription=this.onregionChanged();
        const countrySubscription=this.onCountruChange();
        onCleanup(()=>{
          regionSusbcription.unsubscribe();
        });
      });
    onregionChanged(){
      return this.myForm.get('region')!.valueChanges
        .pipe(
          tap(() => this.myForm.get('country')!.setValue('')),
          tap(() => this.myForm.get('border')!.setValue('')),
          tap(() => {
            this.borders.set([]);
            this.countryByRegion.set([]);
          }),
          switchMap(
            region => this.countryService.getCountriesByRegion(region ?? ''))
        )
        .subscribe((countries) => {
          console.log({countries});
          this.countryByRegion.set(countries);
        }
      )
    }

    onCountruChange(){
      return this.myForm.get('country')!.valueChanges
        .pipe(
          tap( () => this.myForm.get('border')!.setValue('') ),
          filter( value => value!.length > 0    ),
          switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
          switchMap( country => this.countryService.getCountriesBorderBycodeByArray( country?.borders ?? [] )  )
        )
        .subscribe((borders) =>{
          console.log({borders});
          this.borders.set(borders);
        });
    }

}
