import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateTemplateComponent } from './plate-template.component';

describe('PlateTemplateComponent', () => {
  let component: PlateTemplateComponent;
  let fixture: ComponentFixture<PlateTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlateTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
