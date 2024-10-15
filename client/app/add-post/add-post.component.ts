import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  addPostFormGroup: FormGroup;
  // range: FormGroup;

  message = new FormControl<string>('', [Validators.required]);
  destination = new FormControl<string>('', [Validators.required]);

  // startDate = new FormControl<Date>(new Date(), [Validators.required]);
  // endDate = new FormControl<Date>(new Date(), [Validators.required]);

  constructor(test: FormBuilder) {
    this.addPostFormGroup = test.group({
      message: this.message,
      destination: this.destination,
      // startDate: this.startDate,
      // endDate: this.endDate
    });

    // this.range = test.group({
    //   startDate: this.startDate,
    //   endDate: this.endDate,
    // });
  }
}
