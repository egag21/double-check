// file: budget.actions.ts

import { createAction, props } from '@ngrx/store';

export const updateOrder = createAction('[Budget] Update Order', props<{ items: BudgetItem[] }>());

export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  type: 'Income' | 'Credit' | 'Monthly' | 'Misc' | string;
  notes?: string;
  order: number;
}

export const addItem = createAction('[Budget] Add Item', props<{ item: BudgetItem }>());
export const updateItem = createAction('[Budget] Update Item', props<{ item: BudgetItem }>());
export const deleteItem = createAction('[Budget] Delete Item', props<{ id: string }>());
