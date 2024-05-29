import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BudgetItem, addItem, updateItem, deleteItem } from '../../state/budget.actions';
import { BudgetState } from '../../state/budget.reducer';

@Component({
  selector: 'app-budget-checklist',
  templateUrl: './budget-checklist.component.html'
})
export class BudgetChecklistComponent {
  items$: Observable<BudgetItem[]>;

  constructor(private store: Store<{ budget: BudgetState }>) {
    this.items$ = store.select('budget', 'items');
  }

  addItem(item: BudgetItem) {
    this.store.dispatch(addItem({ item }));
  }

  updateItem(item: BudgetItem) {
    this.store.dispatch(updateItem({ item }));
  }

  deleteItem(id: string) {
    this.store.dispatch(deleteItem({ id }));
  }
}
