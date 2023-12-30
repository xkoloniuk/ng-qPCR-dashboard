import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCardComponent } from './sample-card.component';

describe('SampleCardComponent', () => {
  let component: SampleCardComponent;
  let fixture: ComponentFixture<SampleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleCardComponent]
    });
    fixture = TestBed.createComponent(SampleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
