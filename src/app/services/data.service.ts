// data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private storageKey = 'budgetData';

  saveData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  loadData(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}
