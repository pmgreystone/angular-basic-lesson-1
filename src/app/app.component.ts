import { Component } from '@angular/core';

import { InnerTextDemoComponent } from './inner-text-demo/inner-text-demo.component';
import { StructuralDirectivesComponentComponent } from './structural-directives-component/structural-directives-component.component';
import { ShiftsListComponent } from './components/shifts-list/shifts-list.component';
import { ShiftsFilterComponent } from './components/shifts-filter/shifts-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InnerTextDemoComponent,
    StructuralDirectivesComponentComponent,
    ShiftsListComponent,
    ShiftsFilterComponent,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  startDate: Date | undefined;
  endDate: Date | undefined;

  dateFilterRangeUpdated(dateFilterEvent: Date[]) {
    if (dateFilterEvent.length > 1) {
      this.startDate = dateFilterEvent[0];
      this.endDate = dateFilterEvent[1];
    }
  }

}