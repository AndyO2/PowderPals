import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { ResortsService } from '../services/resorts.service';
import { Resort } from '../shared/models/resort.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-resorts',
  templateUrl: './resorts.component.html',
  styleUrls: ['./resorts.component.scss'],
})
export class ResortsComponent implements OnInit {
  resort = new Resort();
  resorts: Resort[] = [];
  isLoading = true;
  isEditing = false;

  constructor(
    private resortsService: ResortsService,
    public toast: ToastComponent
  ) {}

  ngOnInit(): void {
    this.getResorts();
  }

  getResorts(): void {
    this.resortsService
      .getResorts()
      .pipe(take(1))
      .subscribe((resorts) => {
        console.log('calling get resorts');
        this.resorts = resorts;
      });
  }

  enableEditing(resort: Resort): void {
    this.isEditing = true;
    this.resort = resort;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.resort = new Resort();
    this.toast.setMessage('Item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    // this.getResorts();
  }

  editResort(resort: Resort): void {
    this.resortsService.updateResort(resort).subscribe({
      next: () => {
        this.isEditing = false;
        this.resort = resort;
        this.toast.setMessage('Item edited successfully.', 'success');
      },
      error: (error) => console.log(error),
    });
  }

  deleteResort(resort: Resort): void {
    if (
      window.confirm('Are you sure you want to permanently delete this item?')
    ) {
      this.resortsService.deleteResort(resort).subscribe({
        next: () => {
          this.resorts = this.resorts.filter((elem) => elem._id !== resort._id);
          this.toast.setMessage('Item deleted successfully.', 'success');
        },
        error: (error) => console.log(error),
      });
    }
  }
}
