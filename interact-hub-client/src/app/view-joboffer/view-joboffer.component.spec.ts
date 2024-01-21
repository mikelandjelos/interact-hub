import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobofferComponent } from './view-joboffer.component';

describe('ViewJobofferComponent', () => {
  let component: ViewJobofferComponent;
  let fixture: ComponentFixture<ViewJobofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewJobofferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewJobofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
