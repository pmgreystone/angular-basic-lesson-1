import { Component, ChangeDetectorRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DefaultMatCalendarRangeStrategy, MatRangeDateSelectionModel } from '@angular/material/datepicker';
import { DateRange } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

import { Output, EventEmitter } from '@angular/core';


// https://laros.io/using-angular-material-calendar-with-date-ranges-and-range-presets
@Component({
  selector: 'shifts-filter',
  standalone: true,
  providers: [DefaultMatCalendarRangeStrategy, MatRangeDateSelectionModel],
  imports: [MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './shifts-filter.component.html',
  styleUrl: './shifts-filter.component.css',
})
export class ShiftsFilterComponent {
  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  selectedDateRange: DateRange<Date> | undefined;
  @Output() dateFilterRange = new EventEmitter<Date[]>();

  presets = [
    {
      label: 'Today',
      range: {
        start: new Date(),
        end: new Date(),
      },
    },
    {
      label: 'Last 7 days',
      range: {
        start: (() => {
          const date = new Date();
          date.setDate(date.getDate() - 7);
          return date;
        })(),
        end: new Date(),
      },
    },
    {
      label: 'Last 30 days',
      range: {
        start: (() => {
          const date = new Date();
          date.setDate(date.getDate() - 30);
          return date;
        })(),
        end: new Date(),
      },
    }
  ]

  constructor(
    private readonly selectionModel: MatRangeDateSelectionModel<Date>,
    private readonly selectionStrategy: DefaultMatCalendarRangeStrategy<Date>
  ) {
  }

  selectPreset(presetDateRange: { start: Date; end: Date }) {
    this.selectedDateRange = new DateRange<Date>(
      presetDateRange.start,
      presetDateRange.end
    );

    this.dateFilterRange.emit([presetDateRange.start,presetDateRange.end]);

    if (presetDateRange.start && this.calendar)
      this.calendar._goToDateInView(presetDateRange.start, 'month');
  }

  rangeChanged(selectedDate: Date) {
    const selection = this.selectionModel.selection,
      newSelection = this.selectionStrategy.selectionFinished(
        selectedDate,
        selection
      );

    this.selectionModel.updateSelection(newSelection, this);
    this.selectedDateRange = new DateRange<Date>(
      newSelection.start,
      newSelection.end
    );
    if (newSelection.start && newSelection.end)
      this.dateFilterRange.emit([newSelection.start,newSelection.end]);
  }
}