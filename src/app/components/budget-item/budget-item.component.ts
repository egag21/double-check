// file: budget-item.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroupState, createFormGroupState, updateGroup, setValue } from 'ngrx-forms';
import { BudgetItem } from '../../state/budget.actions';

@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html'
})
export class BudgetItemComponent {
  @Input() formState: FormGroupState<BudgetItem>;
  @Input() selMonth: string
  @Output() addItem = new EventEmitter<BudgetItem>();
  @Output() updateItem = new EventEmitter<BudgetItem>();
  @Input() isEdit: boolean = false;

  constructor() {
    if (!this.formState) {
      this.formState = createFormGroupState<BudgetItem>('budgetItemForm', {
        id: '',
        name: '',
        amount: 0,
        currentAmount: null,
        type: 'Misc', // Default type
        notes: '',
        order: null,
        checked: false,
        month: this.selMonth
      });
    }
  }

  onFieldChange(fieldName: keyof BudgetItem, value: any) {
    this.formState = updateGroup<BudgetItem>(this.formState, {
      [fieldName]: setValue(value),
    });
  }

  onSubmit() {
    if (this.formState.value.name) {
      const budgetItem: BudgetItem = {
        ...this.formState.value,
        id: this.formState.value.id || this.generateId()
      };
      if (this.isEdit) {
        this.updateItem.emit(budgetItem);
      } else {
        this.addItem.emit(budgetItem);
      }
    } else {
      alert("A name is required");
    }
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
