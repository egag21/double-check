import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BudgetChecklistComponent } from './components/budget-checklist/budget-checklist.component';
import { BudgetItemComponent } from './components/budget-item/budget-item.component';
import { budgetReducer } from './state/budget.reducer';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    BudgetChecklistComponent,
    BudgetItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ budget: budgetReducer }),
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
