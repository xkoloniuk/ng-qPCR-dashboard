import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetsViewComponent } from './targets-view.component';

describe('TargetsViewComponent', () => {
  let component: TargetsViewComponent;
  let fixture: ComponentFixture<TargetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
