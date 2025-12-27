import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
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
  getCountryByCode(code:string):Observable<Country | null>{
    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url).pipe(
      catchError( () => of(null) )
    );
  }

  // CAMBIO: Implementación del método.
  // Este método estaba vacío. Ahora, consulta la información de varios países a la vez.
  getCountriesByCodes(borders:string[]): Observable<Country[]>{
    // Si no hay 'borders', retorna un arreglo vacío.
    if(!borders || borders.length === 0) return of([]);

    // El API permite enviar varios códigos separados por comas.
    // ['COL', 'BRA', 'PER'] se convierte en "COL,BRA,PER"
    const codes = borders.join(',');

    const url = `${this.baseUrl}/alpha?codes=${codes}&fields=cca3,name,borders`;

    return this.http.get<Country[]>(url);
  }
}
