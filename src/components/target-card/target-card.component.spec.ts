import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetCardComponent } from './target-card.component';

describe('TargetCardComponent', () => {
  let component: TargetCardComponent;
  let fixture: ComponentFixture<TargetCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetCardComponent]
    });
    fixture = TestBed.createComponent(TargetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
