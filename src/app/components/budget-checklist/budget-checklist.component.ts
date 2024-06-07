// file: budget-checklist.component.ts

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { BudgetItem, addItem, updateItem, deleteItem } from '../../state/budget.actions';
import { BudgetState } from '../../state/budget.reducer';
import { FormGroupState, createFormGroupState } from 'ngrx-forms';
import { DataService } from '../../services/data.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-budget-checklist',
  templateUrl: './budget-checklist.component.html',
  styleUrls: ['./budget-checklist.component.scss']
})
export class BudgetChecklistComponent implements OnInit, OnDestroy {
  @Input() type: string;
  @Output() addItem = new EventEmitter<BudgetItem>();

  items$: Observable<BudgetItem[]>;
  filteredItems$: Observable<BudgetItem[]>;
  editItem: BudgetItem | null = null;
  editFormState: FormGroupState<BudgetItem>;
  showAddItem: boolean = false;
  private storeSubscription: Subscription;

  constructor(
    private store: Store<{ budget: BudgetState }>,
    private dataService: DataService
  ) {
    this.items$ = store.select(state => state.budget.items);
    this.filteredItems$ = this.items$.pipe(map(items => items.filter(item => item.type === this.type)));
  }

  ngOnInit(): void {
    this.store.select(state => state.budget.items).pipe(
      take(1), // Take the first value emitted by the observable
    ).subscribe(items => {
      if (items.length === 0) {
        // Only load data if there are no items in the state
        const savedData = this.dataService.loadData();
        if (savedData) {
          savedData.items.forEach((item: BudgetItem) => {
            this.store.dispatch(addItem({ item }));
          });
        }
      }
    });

    this.storeSubscription = this.items$.pipe(
      debounceTime(500)  // Debounce saving to local storage to reduce the frequency of operations
    ).subscribe(items => {
      this.dataService.saveData({ items });
    });
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  toggleAddItem(): void {
    this.showAddItem = !this.showAddItem;
    this.editItem = null; // Reset edit item
    this.editFormState = createFormGroupState<BudgetItem>('budgetItemForm', {
      id: '',
      name: '',
      amount: null,
      type: this.type, // Set the type based on the input
      notes: ''
    });
  }

  onAddItem(item: BudgetItem): void {
    this.addItem.emit(item);
    this.showAddItem = false; // Hide the form after adding the item
  }

  updateItem(item: BudgetItem): void {
    this.store.dispatch(updateItem({ item }));
    this.editItem = null; // Reset edit state
    this.editFormState = null; // Clear form state
  }

  deleteItem(id: string): void {
    this.store.dispatch(deleteItem({ id }));
  }

  editBudgetItem(item: BudgetItem): void {
    this.editItem = item;
    this.editFormState = createFormGroupState<BudgetItem>('editBudgetItemForm', item);
    this.showAddItem = false; // Hide the add form if it was open
  }
}
