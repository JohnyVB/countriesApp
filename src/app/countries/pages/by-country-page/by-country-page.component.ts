import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesServices: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.name.countries;
    this.initialValue = this.countriesServices.cacheStore.name.term;
  }

  searchByCountry(country: string): void {
    this.isLoading = true;
    this.countriesServices.searchByTerm(country, 'name').subscribe(country => {
      this.countries = country;
      this.isLoading = false;
    });
  }

}
