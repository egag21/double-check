import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BudgetItem, addItem } from './state/budget.actions';
import { BudgetState } from './state/budget.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<{ budget: BudgetState }>) { }

  onAddItem(item: BudgetItem) {
    this.store.dispatch(addItem({ item }));
  }
}
