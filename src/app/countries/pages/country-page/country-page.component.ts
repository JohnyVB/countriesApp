import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit {

  public country?: Country | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesServices: CountriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ idcountry }) => this.countriesServices.searchByAlphaCode(idcountry))
      )
      .subscribe(country => {
        if (!country) this.router.navigateByUrl('');
        this.country = country
      });
  }
}
