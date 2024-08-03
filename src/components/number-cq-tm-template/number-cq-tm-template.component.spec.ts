import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCqTmTemplateComponent } from './number-cq-tm-template.component';

describe('NumberCqTmTemplateComponent', () => {
  let component: NumberCqTmTemplateComponent;
  let fixture: ComponentFixture<NumberCqTmTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberCqTmTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberCqTmTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
