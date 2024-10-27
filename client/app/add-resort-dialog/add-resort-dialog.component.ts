import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ResortsService } from '../services/resorts.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-add-resort-dialog',
  templateUrl: './add-resort-dialog.component.html',
  styleUrl: './add-resort-dialog.component.scss',
})
export class AddResortDialogComponent implements AfterViewInit {
  @ViewChild('resortAddress') resortNames!: ElementRef;

  autocomplete!: google.maps.places.Autocomplete | undefined;

  addResortFormGroup: FormGroup;
  name = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  country = new FormControl('', Validators.required);
  rating = new FormControl(0, Validators.required);
  address = new FormControl('', Validators.required);

  constructor(
    private resortsService: ResortsService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) {
    this.addResortFormGroup = this.formBuilder.group({
      name: this.name,
      city: this.city,
      state: this.state,
      country: this.country,
      rating: this.rating,
      address: this.address,
    });
  }

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.resortNames.nativeElement,
      {
        fields: ['name', 'address_components', 'formatted_address', 'rating'],
        types: ['establishment'],
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      let placeName = '';
      let city = '';
      let state = '';
      let country = '';
      let address = '';
      let rating = 0;

      if (place?.formatted_address) {
        address = place.formatted_address;
        console.log(address);
      }

      if (place?.name) {
        placeName = place.name.split(',')[0].trim();
      }

      if (place?.rating) {
        rating = place.rating;
        console.log(rating);
      }

      place?.address_components?.forEach((component) => {
        if (component.types.includes('locality')) {
          city = component.long_name;
        }
        if (
          component.types.includes('administrative_area_level_1') ||
          component.types.includes('administrative_area_level_2')
        ) {
          state = component.long_name;
        }
        if (component.types.includes('country')) {
          country = component.long_name;
        }
      });

      this.addResortFormGroup.patchValue({
        name: placeName,
        city,
        state,
        country,
        rating,
        address,
      });

      console.log(place);
    });
  }

  addResort() {
    console.log(this.addResortFormGroup.value);
    this.resortsService.addResort(this.addResortFormGroup.value).subscribe({
      next: (data) => {
        console.log(data);
        this.addResortFormGroup.reset();
        this.toast.setMessage('Resort added successfully.', 'success');
      },
      error: (error) => {
        console.error(error);
        this.toast.setMessage('Resort added Unsuccessfully.', 'danger');
      },
    });
  }
}
