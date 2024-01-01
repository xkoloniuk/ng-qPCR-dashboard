import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunViewComponent } from './run-view.component';

describe('RunViewComponent', () => {
  let component: RunViewComponent;
  let fixture: ComponentFixture<RunViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunViewComponent]
    });
    fixture = TestBed.createComponent(RunViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
