import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    capital: { term: '', countries: [] },
    name: { term: '', countries: [] },
    region: { term: '', countries: [] }
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheLocal', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {

    if (!localStorage.getItem('cacheLocal')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheLocal')!);
  }

  searchByTerm(termino: string, tipo: string): Observable<Country[]> {
    let endpoint: string;

    switch (tipo) {
      case 'capital':
        endpoint = `capital/${termino}`;
        break;
      case 'name':
        endpoint = `name/${termino}`;
        break;
      case 'region':
        endpoint = `region/${termino}`;
        break;
      default:
        return of([]);
    }

    return this.httpClient.get<Country[]>(`${this.apiUrl}/${endpoint}`)
      .pipe(
        catchError(() => of([])),
        tap(countries => this.cacheStore[tipo] = { term: termino, countries }),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchByAlphaCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(err => of(null))
      )
  }
}
