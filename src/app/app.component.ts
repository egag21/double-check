// file: app.component.ts

import { Component, ViewChild, ViewChildren, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { BudgetItem, addItem, duplicateItems } from './state/budget.actions';
import { BudgetState } from './state/budget.reducer';
import { BudgetChecklistComponent } from './components/budget-checklist/budget-checklist.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('dateSelect') dateSelect!: ElementRef<HTMLSelectElement>;
  @ViewChildren(BudgetChecklistComponent) checklistComponents!: QueryList<BudgetChecklistComponent>;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dates: string[] = this.loadDatesFromLocalStorage();
  selectedDate: string = this.dates[this.dates.length - 1];
  curMonth: string;
  dropdownWidth: string = 'auto';

  constructor(private store: Store<{ budget: BudgetState }>) { }

  ngOnInit() {
    this.onDateChange(this.dates[this.dates.length - 1]);
  }

  ngAfterViewInit() {
    this.updateDropdownWidth();
  }

  createNewItem(itemType: string) {
    const targetComponent = this.checklistComponents.find(comp => comp.type === itemType);
    if (targetComponent) {
      targetComponent.toggleAddItem(itemType);
    }
  }

  onDateChange(newDate: string): void {
    this.curMonth = newDate;
    console.log('curMonth updated to:', this.curMonth);
  }

  onAddItem(item: BudgetItem) {
    this.store.dispatch(addItem({ item }));
  }

  addDate() {
    const lastDate = this.dates[this.dates.length - 1];
    const [lastMonth, lastYear] = lastDate.split(' ');
    let monthIndex = this.months.indexOf(lastMonth);
    let year = parseInt(lastYear, 10);

    monthIndex++;
    if (monthIndex === 12) {
      monthIndex = 0;
      year++;
    }

    const newDate = `${this.months[monthIndex]} ${year}`;
    this.dates.push(newDate);
    this.selectedDate = newDate;
    this.onDateChange(newDate);

    this.updateDropdownWidth();

    // Duplicate items from current month to new month
    this.store.dispatch(duplicateItems({ currentMonth: lastDate, newMonth: newDate }));

    // Save dates to local storage
    this.saveDatesToLocalStorage();

    // Set focus to the select element
    setTimeout(() => {
      this.dateSelect.nativeElement.focus();
    }, 0);
  }

  updateDropdownWidth() {
    setTimeout(() => {
      const selectElement = this.dateSelect.nativeElement;
      selectElement.style.width = 'auto'; // Reset width to auto before calculating
      const width = selectElement.scrollWidth;
      this.dropdownWidth = `${width + 10}px`; // Add some padding to avoid clipping
    }, 0);
  }

  getCurrentMonthAndYear(): string {
    const now = new Date();
    const month = this.months[now.getMonth()];
    const year = now.getFullYear().toString().slice(-2);

    return `${month} ${year}`;
  }

  private loadDatesFromLocalStorage(): string[] {
    const dates = localStorage.getItem('budgetDates');
    return dates ? JSON.parse(dates) : [this.getCurrentMonthAndYear()];
  }

  private saveDatesToLocalStorage(): void {
    localStorage.setItem('budgetDates', JSON.stringify(this.dates));
  }
}
