import { Component } from '@angular/core';
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
export class AddResortDialogComponent {
  addResortFormGroup: FormGroup;
  resortName = new FormControl('', Validators.required);
  resortCity = new FormControl('', Validators.required);
  resortState = new FormControl('', Validators.required);
  resortCountry = new FormControl('', Validators.required);
  resortContinent = new FormControl('', Validators.required);
  resortDescription = new FormControl('', Validators.required);
  resortImage = new FormControl('', Validators.required);

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
      resortDescription: this.resortDescription,
      resortContinent: this.resortContinent,
      resortImage: this.resortImage,
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
