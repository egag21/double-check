// file: budget.reducer.ts

// Import necessary functions and types from @ngrx/store and budget.actions
import { createReducer, on } from '@ngrx/store';
import { BudgetItem } from './budget.actions';
import { addItem, updateItem, deleteItem, updateOrder } from './budget.actions';

// Define the structure of the BudgetState interface
export interface BudgetState {
  items: BudgetItem[]; // An array of BudgetItem objects representing the budget items
}

// Define the initial state of the budget, starting with an empty array of items
export const initialState: BudgetState = {
  items: []
};

// Create the reducer function for the budget state
// The reducer handles different actions that modify the budget state
export const budgetReducer = createReducer(
  initialState,

  // Handle the addItem action
  // When addItem is dispatched, add the new item to the list of budget items
  on(addItem, (state, { item }) => ({
    ...state, // Copy the current state
    items: [...state.items, item] // Add the new item to the items array
  })),

  // Handle the updateItem action
  // When updateItem is dispatched, update the item with the matching id
  on(updateItem, (state, { item }) => ({
    ...state, // Copy the current state
    items: state.items.map(i => i.id === item.id ? item : i) // Map through items and replace the item with the same id
  })),

  // Handle the deleteItem action
  // When deleteItem is dispatched, remove the item with the matching id
  on(deleteItem, (state, { id }) => ({
    ...state, // Copy the current state
    items: state.items.filter(item => item.id !== id) // Filter out the item with the specified id
  })),

  // Handle the updateOrder action
  // When updateOrder is dispatched, update the order of the items array
  on(updateOrder, (state, { items }) => ({
    ...state, // Copy the current state
    items: state.items.map(item => {
      const updatedItem = items.find(i => i.id === item.id); // Find the updated item with the same id
      return updatedItem ? updatedItem : item; // Replace with updated item or keep the original if not found
    })
  }))
);
