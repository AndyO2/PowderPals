import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortDetailComponent } from './resort-detail.component';

describe('ResortDetailComponent', () => {
  let component: ResortDetailComponent;
  let fixture: ComponentFixture<ResortDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResortDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResortDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
