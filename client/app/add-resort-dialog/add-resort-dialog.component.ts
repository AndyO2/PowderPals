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
  @ViewChild('resortName') resortNames!: ElementRef;

  autocomplete!: google.maps.places.Autocomplete | undefined;

  addResortFormGroup: FormGroup;
  resortName = new FormControl('', Validators.required);
  resortCity = new FormControl('', Validators.required);
  resortState = new FormControl('', Validators.required);
  resortCountry = new FormControl('', Validators.required);

  constructor(
    private resortsService: ResortsService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) {
    this.addResortFormGroup = this.formBuilder.group({
      resortName: this.resortName,
      resortCity: this.resortCity,
      resortState: this.resortState,
      resortCountry: this.resortCountry,
    });
  }

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.resortNames.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      console.log(place);
    });
  }

  addResort() {
    this.resortsService.addResort(this.addResortFormGroup.value).subscribe({
      next: (data) => {
        console.log(data);
        this.addResortFormGroup.reset();
        this.toast.setMessage('Resort added successfully.', 'success');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getResort(name: string) {
    this.resortsService.getGoogleResortInfo(name).subscribe((data) => {
      console.log(data);
    });
  }
}
