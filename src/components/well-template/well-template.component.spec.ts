import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellTemplateComponent } from './well-template.component';

describe('WellTemplateComponent', () => {
  let component: WellTemplateComponent;
  let fixture: ComponentFixture<WellTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
