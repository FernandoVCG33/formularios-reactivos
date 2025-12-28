import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, combineLatest, map, Observable, of} from 'rxjs';
import {Country} from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private baseUrl='https://restcountries.com/v3.1';
  private http=inject(HttpClient);

  // Esta parte está bien.
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

  // Esta parte está bien.
  getCountriesByRegion(region:string): Observable<Country[]>{
    if(!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  // CAMBIO: Se añade manejo de error.
  // Si el API devuelve un error 404 (no encontrado), el servicio devolverá `null`.
  getCountryByAlphaCode(code:string):Observable<Country | null>{
    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url).pipe(
      catchError( () => of(null) )
    );
  }

  getCountriesBorderBycodeByArray(contriesCode:string[]):Observable<Country[] >{
      if(  !contriesCode || contriesCode.length===0) return of([]);
      const countriesRequest:Observable<Country>[]=[];
    contriesCode.forEach((code) => {
      const request=this.getCountryByAlphaCode(code);
      countriesRequest.push(request as Observable<Country> );
    });
    return combineLatest(countriesRequest);
  }
}
