import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityIncrementDecrementComponent } from './quantity-increment-decrement.component';

describe('QuantityIncrementDecrementComponent', () => {
  let component: QuantityIncrementDecrementComponent;
  let fixture: ComponentFixture<QuantityIncrementDecrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityIncrementDecrementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantityIncrementDecrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
