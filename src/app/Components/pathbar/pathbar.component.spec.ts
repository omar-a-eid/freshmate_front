import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathbarComponent } from './pathbar.component';

describe('PathbarComponent', () => {
  let component: PathbarComponent;
  let fixture: ComponentFixture<PathbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PathbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
