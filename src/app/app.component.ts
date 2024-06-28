// file: app.component.ts

import { Component, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { BudgetItem, addItem } from './state/budget.actions';
import { BudgetState } from './state/budget.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('dateSelect') dateSelect!: ElementRef<HTMLSelectElement>;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dates: string[] = ['June 24'];
  selectedDate: string = this.dates[0];

  constructor(private store: Store<{ budget: BudgetState }>) { }

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

    // Set focus to the select element
    setTimeout(() => {
      this.dateSelect.nativeElement.focus();
    }, 0);
  }
}
