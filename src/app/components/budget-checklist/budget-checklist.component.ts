import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BudgetItem, addItem, updateItem, deleteItem } from '../../state/budget.actions';
import { BudgetState } from '../../state/budget.reducer';
import { FormGroupState, createFormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-budget-checklist',
  templateUrl: './budget-checklist.component.html',
  styleUrls: ['./budget-checklist.component.scss']
})
export class BudgetChecklistComponent {
  items$: Observable<BudgetItem[]>;
  editItem: BudgetItem | null = null;
  editFormState: FormGroupState<BudgetItem>;

  constructor(private store: Store<{ budget: BudgetState }>) {
    this.items$ = store.select(state => state.budget.items);
  }

  addItem(item: BudgetItem) {
    this.store.dispatch(addItem({ item }));
  }

  updateItem(item: BudgetItem) {
    this.store.dispatch(updateItem({ item }));
    this.editItem = null; // Reset edit state
  }

  deleteItem(id: string) {
    this.store.dispatch(deleteItem({ id }));
  }

  editBudgetItem(item: BudgetItem) {
    this.editItem = item;
    this.editFormState = createFormGroupState<BudgetItem>('editBudgetItemForm', item);
  }
}
