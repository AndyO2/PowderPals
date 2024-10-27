import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResortFormComponent } from '../add-resort/add-resort.component';

describe('AddResortFormComponent', () => {
  let component: AddResortFormComponent;
  let fixture: ComponentFixture<AddResortFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResortFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResortFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
