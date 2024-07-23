// file: budget.actions.ts

import { createAction, props } from '@ngrx/store';

/**
 * Action to update the order of budget items.
 * @param items - An array of BudgetItem objects representing the budget items to update.
 */
export const updateOrder = createAction('[Budget] Update Order', props<{ items: BudgetItem[] }>());

/**
 * Interface representing a budget item.
 */
export interface BudgetItem {
  id: string; // Unique identifier for the budget item
  name: string; // Name of the budget item
  amount?: number; // Amount allocated to the budget item
  currentAmount?: number; // Optional current amount for the budget item
  type: 'Income' | 'Tithe' | 'Credit' | 'Savings' | 'ToGermany' | 'Misc' | string; // Type of budget item
  notes?: string; // Optional notes about the budget item
  order: number; // Order position of the budget item
  checked: boolean; // Indicates if the budget item is checked
  month: string; // Month associated with the budget item
}

/**
 * Action to add a new budget item.
 * @param item - The BudgetItem object representing the new budget item to add.
 */
export const addItem = createAction('[Budget] Add Item', props<{ item: BudgetItem }>());

/**
 * Action to update an existing budget item.
 * @param item - The BudgetItem object representing the budget item to update.
 */
export const updateItem = createAction('[Budget] Update Item', props<{ item: BudgetItem }>());

/**
 * Action to delete a budget item.
 * @param id - The unique identifier of the budget item to delete.
 */
export const deleteItem = createAction('[Budget] Delete Item', props<{ id: string }>());


/**
 * Action to duplicate budget items to a new month.
 * @param currentMonth - The current month to duplicate items from.
 * @param newMonth - The new month to duplicate items to.
 */
export const duplicateItems = createAction('[Budget] Duplicate Items', props<{ currentMonth: string, newMonth: string }>());
