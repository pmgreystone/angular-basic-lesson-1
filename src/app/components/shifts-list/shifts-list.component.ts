import { Component, Input } from '@angular/core';
import { ShiftsService } from '../../services/shifts.service';
import { OnInit } from '@angular/core';
import { Shift } from '../../../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
    return shifts.filter(
      x =>
        (new Date(Date.parse(x.start!)) >= startDate) &&
        (new Date(Date.parse(x.stop!)) <= endDate)
    )
  }

  getShifts(): Partial<Shift>[] {
    return this.filteredShifts;
  }
}
