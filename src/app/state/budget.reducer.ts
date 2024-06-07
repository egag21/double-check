// budeget.reducer.ts

import { createReducer, on, Action } from '@ngrx/store';
import { addItem, updateItem, deleteItem, BudgetItem } from './budget.actions';

export interface BudgetState {
  items: BudgetItem[];
}

export const initialState: BudgetState = {
  items: []
};

const _budgetReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),
  on(updateItem, (state, { item }) => ({
    ...state,
    items: state.items.map(existingItem =>
      existingItem.id === item.id ? item : existingItem
    )
  })),
  on(deleteItem, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id)
  }))
);

export function budgetReducer(state: BudgetState | undefined, action: Action) {
  return _budgetReducer(state, action);
}
