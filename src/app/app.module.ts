import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { BudgetChecklistComponent } from './components/budget-checklist/budget-checklist.component';
import { BudgetItemComponent } from './components/budget-item/budget-item.component';
import { budgetReducer } from './state/budget.reducer';

@NgModule({
  declarations: [
    AppComponent,
    BudgetChecklistComponent,
    BudgetItemComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ budget: budgetReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
