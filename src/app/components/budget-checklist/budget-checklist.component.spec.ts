import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetChecklistComponent } from './budget-checklist.component';

describe('BudgetChecklistComponent', () => {
  let component: BudgetChecklistComponent;
  let fixture: ComponentFixture<BudgetChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetChecklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
