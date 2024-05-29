import { createAction, props } from '@ngrx/store';

export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
}

export const addItem = createAction('[Budget] Add Item', props<{ item: BudgetItem }>());
export const updateItem = createAction('[Budget] Update Item', props<{ item: BudgetItem }>());
export const deleteItem = createAction('[Budget] Delete Item', props<{ id: string }>());
