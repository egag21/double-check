import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroupState, createFormGroupState } from 'ngrx-forms';
import { BudgetItem } from '../../state/budget.actions';

@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html'
})
export class BudgetItemComponent {
  @Input() formState: FormGroupState<BudgetItem>;
  @Output() addItem = new EventEmitter<BudgetItem>();

  constructor() {
    if (!this.formState) {
      this.formState = createFormGroupState<BudgetItem>('budgetItemForm', {
        id: '',
        name: '',
        amount: 0,
      });
    }
  }

  onAddItem() {
    if (this.formState.value.name && this.formState.value.amount) {
      const budgetItem: BudgetItem = {
        ...this.formState.value,
        id: this.formState.value.id || this.generateId()
      };
      this.addItem.emit(budgetItem);
    }
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
