// file: data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private storageKey = 'budgetData';

  saveData(data: any): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  loadData(): any {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error loading from localStorage', e);
      return null;
    }
  }

  clearData(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }
}
