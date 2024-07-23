// file: budget-checklist.component.ts

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { BudgetItem, addItem, updateItem, deleteItem, updateOrder } from '../../state/budget.actions';
import { BudgetState } from '../../state/budget.reducer';
import { FormGroupState, createFormGroupState } from 'ngrx-forms';
import { DataService } from '../../services/data.service';
import { take } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-budget-checklist',
  templateUrl: './budget-checklist.component.html',
  styleUrls: ['./budget-checklist.component.scss']
})
export class BudgetChecklistComponent implements OnInit, OnDestroy {
  @Input() type: string;
  @Input() selMonth: string;
  @Output() addItem = new EventEmitter<BudgetItem>();

  connectedLists: string[] = ['Income', 'Tithe', 'Credit', 'Monthly', 'Misc'];

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
    this.filteredItems$ = this.items$.pipe(
      map(items => items.filter(item => item.type === this.type).sort((a, b) => a.order - b.order))
    );
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

  toggleAddItem(itemType: string): void {
    this.showAddItem = !this.showAddItem;
    this.editItem = null; // Reset edit item
    this.editFormState = createFormGroupState<BudgetItem>('budgetItemForm', {
      id: '',
      name: '',
      amount: null,
      currentAmount: null,
      type: itemType,
      notes: '',
      order: null,
      checked: false,
      month: this.selMonth
    });
  }

  onAddItem(item: BudgetItem): void {
    this.filteredItems$.pipe(take(1)).subscribe(items => {
      item.order = items.length; // Set the order to the current length of the items array
      this.addItem.emit(item);
      this.showAddItem = false; // Hide the form after adding the item
    });
  }

  updateItem(item: BudgetItem): void {
    this.store.dispatch(updateItem({ item }));
    this.editItem = null; // Reset edit state
    this.editFormState = null; // Clear form state
  }

  updateCurrentAmount(item: BudgetItem, value: number): void {
    const updatedItem = { ...item, currentAmount: value };
    this.store.dispatch(updateItem({ item: updatedItem }));
  }

  deleteItem(id: string): void {
    this.store.dispatch(deleteItem({ id }));
  }

  editBudgetItem(item: BudgetItem): void {
    this.editItem = item;
    this.editFormState = createFormGroupState<BudgetItem>('editBudgetItemForm', item);
    this.showAddItem = false; // Hide the add form if it was open
  }

  drop(event: CdkDragDrop<BudgetItem[]>, targetType: string): void {
    console.log('Drop event:', event);

    if (!event.previousContainer.data || !event.container.data) {
      console.error('Container data is undefined');
      return;
    }

    if (event.previousContainer === event.container) {
      // Item was moved within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateItemsOrder(event.container.data);
    } else {
      // Item was moved to a different list
      const previousContainerItems = event.previousContainer.data;
      const containerItems = event.container.data;

      if (!previousContainerItems[event.previousIndex]) {
        console.error('Item at previous index is undefined');
        return;
      }

      // Update the type of the moved item
      const item = previousContainerItems[event.previousIndex];
      item.type = targetType;

      transferArrayItem(previousContainerItems, containerItems, event.previousIndex, event.currentIndex);

      // Update the order for both lists
      this.updateItemsOrder(previousContainerItems);
      this.updateItemsOrder(containerItems);
    }
  }

  updateItemsOrder(items: BudgetItem[]): void {
    const updatedItems = items.map((item, index) => ({ ...item, order: index }));
    this.store.dispatch(updateOrder({ items: updatedItems }));
  }

  toggleCheckmark(item: BudgetItem): void {
    this.store.dispatch(updateItem({ item: { ...item, checked: !item.checked } }));
  }

  // Method to return appropriate CSS class based on the type
  getTypeClass(): string {
    // console.log('Type:', this.type);
    switch (this.type) {
      case 'Income':
        return 'income-background';
      case 'Tithe':
        return 'tithing-background';
      case 'Credit':
        return 'expense-background';
      case 'Monthly':
        return 'expense-background';
      case 'Misc':
        return 'expense-background';
      default:
        return 'expense-background';
    }
  }
}
