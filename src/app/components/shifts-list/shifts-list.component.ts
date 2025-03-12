import { Component, Input } from '@angular/core';
import { ShiftsService } from '../../services/shifts.service';
import { OnInit } from '@angular/core';
import { Shift } from '../../../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import moment from 'moment-timezone';

@Component({
  selector: 'shifts-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './shifts-list.component.html',
  styleUrl: './shifts-list.component.css',
})
export class ShiftsListComponent implements OnInit {
  @Input() startDate: Date | undefined;
  @Input() endDate: Date | undefined;
  private shifts: Partial<Shift>[];
  private filteredShifts: Partial<Shift>[];
  userId: string = "";

  constructor(private shiftsService: ShiftsService) {
    this.shifts = [
      { id: 1, detail: 'morning shift' },
      { id: 2, detail: 'evening shift' },
    ];
    this.filteredShifts = this.shifts;
  }

  ngOnInit() {
    this.shiftsService.getShifts().subscribe({
      next: (result) => {
        console.log('success:');
        this.shifts = result;
        this.filteredShifts = result;
      },
      error: (error) => {
        console.log('error:');
        console.log(error);
      },
      complete: () => {
        console.log('request completed!');
      },
    });
  }

  applyFilter() {
    const id = this.userId;
    if (id) {
      if (parseInt(id, 10) > 0) {
        const intId = parseInt(id, 10);
        this.filteredShifts = this.shifts.filter(x => x.uid === intId);
      }
    }
    if (this.startDate && this.endDate) {
      this.filteredShifts = this.filterByDates(this.filteredShifts, this.startDate, this.endDate);
    }
  }

  filterByDates(shifts: Partial<Shift>[], startDate: Date, endDate: Date) {
    const tz = 'America/Vancouver'
    let mStartDate = moment.tz(startDate,tz);
    let mEndDate = moment.tz(endDate,tz);
    mEndDate = mEndDate.add(1,'d');
    return shifts.filter(
      (x,idx)=> {
        console.log(`idx: ${idx}`);
        const cStart = moment.tz(x.start!,tz);
        const cStop = moment.tz(x.stop!,tz);
        console.log(cStart.toString());
        console.log(cStop.toString());
        const result =
          (cStart >= mStartDate && cStart <= mEndDate) &&
          (cStop >= mStartDate && cStop <= mEndDate);
        return result;
      }
    )
  }

  getShifts(): Partial<Shift>[] {
    return this.filteredShifts;
  }
}
