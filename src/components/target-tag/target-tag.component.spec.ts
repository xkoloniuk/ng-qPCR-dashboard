import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetTagComponent } from './target-tag.component';

describe('TargetTagComponent', () => {
  let component: TargetTagComponent;
  let fixture: ComponentFixture<TargetTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
