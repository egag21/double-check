import { Component } from '@angular/core';
import { FormGroupState, createFormGroupState, updateGroup, validate } from 'ngrx-forms';

interface BudgetItemFormValue {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html'
})
export class BudgetItemComponent {
  formState: FormGroupState<BudgetItemFormValue>;

  constructor() {
    this.formState = createFormGroupState<BudgetItemFormValue>('budgetItemForm', {
      name: '',
      amount: 0,
    });
  }

  // Add form validation and other logic here
}
