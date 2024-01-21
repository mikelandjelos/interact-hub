import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobofferdetailsComponent } from './jobofferdetails.component';

describe('JobofferdetailsComponent', () => {
  let component: JobofferdetailsComponent;
  let fixture: ComponentFixture<JobofferdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobofferdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobofferdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
