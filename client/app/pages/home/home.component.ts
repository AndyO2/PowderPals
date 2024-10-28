import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResortsService } from 'client/app/services/resorts.service';
import { Resort } from 'client/app/shared/models/resort.model';
import { take } from 'rxjs';
import { Country } from 'client/app/shared/models/country.enum';

interface FiltersFormGroup {
  name: FormControl<string | null>;
  continent: FormControl<string | null>;
  country: FormControl<string | null>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  resorts: Resort[] = [];

  filterFormGroup: FormGroup;

  countryEnum = Country;

  name = new FormControl('', Validators.required);
  continent = new FormControl<string>('', Validators.required);
  country = new FormControl<Country>(Country.None, Validators.required);

  constructor(private resortsService: ResortsService, private fb: FormBuilder) {
    this.filterFormGroup = this.fb.group<FiltersFormGroup>({
      name: this.name,
      continent: this.continent,
      country: this.country,
    });

    this.filterFormGroup.valueChanges.subscribe((filters) => {
      console.log(filters);
      this.filterResorts(filters);
    });

    this.getAllResorts();
  }

  getAllResorts() {
    this.resortsService
      .getResorts()
      .pipe(take(1))
      .subscribe((resorts) => {
        this.resorts = resorts;
      });
  }

  filterResorts(filters: any) {
    const clearedFilters =
      this.name.value === '' &&
      this.continent.value === '' &&
      this.country.value === Country.None;

    if (clearedFilters) {
      this.getAllResorts();
      return;
    }

    this.resortsService
      .filterResorts(filters)
      .pipe(take(1))
      .subscribe((resorts) => {
        this.resorts = resorts;
      });
  }
}
