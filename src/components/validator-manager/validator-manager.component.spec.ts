import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorManagerComponent } from './validator-manager.component';

describe('ValidatorManagerComponent', () => {
  let component: ValidatorManagerComponent;
  let fixture: ComponentFixture<ValidatorManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatorManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidatorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
