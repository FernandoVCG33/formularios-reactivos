import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Country} from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private baseUrl='https://restcountries.com/v3.1/';
  private http=inject(HttpClient);

  regions=[
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ];
  getRegions():string[]{
    return [...this.regions];
  }
  getCountriesByRegion(region:string): Observable<Country[]>{
    if(!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);

  }
  getCountryByCode(code:string):Observable<Country | null>{
    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }
  getCountriesByCodes(borders:string[]){

  }
}
