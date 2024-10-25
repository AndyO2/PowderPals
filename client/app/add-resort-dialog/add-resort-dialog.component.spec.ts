import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResortDialogComponent } from '../add-resort/add-resort.component';

describe('AddResortDialogComponent', () => {
  let component: AddResortDialogComponent;
  let fixture: ComponentFixture<AddResortDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResortDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
