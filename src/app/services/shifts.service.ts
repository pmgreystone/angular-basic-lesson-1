import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shift } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShiftsService {
  private baseUrl = 'http://localhost:3000';
  private shifts: Observable<Shift[]>;

  constructor(private httpClient: HttpClient) {
    const url = `${this.baseUrl}/shifts`;
    this.shifts = this.httpClient.get<Shift[]>(url);
  }

  getShifts(): Observable<Shift[]> {
    return this.shifts;
  }
}
