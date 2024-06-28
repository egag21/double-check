// file: budget.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { BudgetItem } from './budget.actions';
import { addItem, updateItem, deleteItem, updateOrder } from './budget.actions';

export interface BudgetState {
  items: BudgetItem[];
}

export const initialState: BudgetState = {
  items: []
};

export const budgetReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),
  on(updateItem, (state, { item }) => ({
    ...state,
    items: state.items.map(i => i.id === item.id ? item : i)
  })),
  on(deleteItem, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id)
  })),
  on(updateOrder, (state, { items }) => ({
    ...state,
    items: state.items.map(item => {
      const updatedItem = items.find(i => i.id === item.id);
      return updatedItem ? updatedItem : item;
    })
  }))
);

