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

interface FiltersFormGroup {
  name: FormControl<string | null>;
  state: FormControl<string | null>;
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

  name = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  country = new FormControl('', Validators.required);

  constructor(private resortsService: ResortsService, private fb: FormBuilder) {
    this.filterFormGroup = this.fb.group<FiltersFormGroup>({
      name: this.name,
      state: this.state,
      continent: this.country,
      country: this.country,
    });

    this.filterFormGroup.valueChanges.subscribe((filters) => {
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
    console.log(filters);

    const clearedFilters =
      this.name.value === '' &&
      this.state.value === '' &&
      this.country.value === '';

    if (clearedFilters) {
      this.getAllResorts();
      return;
    }

    // TODO: Filter precedence:
    // 1) Name: Sorts Alphabetical order (A-Z)
    // 2) Continent: Filters out resorts that don't match the continent
    // 3) State: Filters out resorts that don't match the state

    // Sort by Name (A-Z)
    let filteredResorts = [...this.resorts].sort((a, b) =>
      (a.name || '').localeCompare(b.name || '')
    );

    // Filter by Continent
    if (this.country.value) {
      filteredResorts = filteredResorts.filter(
        (resort) => resort.continent === this.country.value
      );
    }

    // Filter by State
    if (this.state.value) {
      filteredResorts = filteredResorts.filter(
        (resort) => resort.state === this.state.value
      );
    }

    this.resorts = filteredResorts;
    console.log(this.resorts);
  }
}
