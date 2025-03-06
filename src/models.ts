export interface User {
  id: number;
  uname: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface Shift {
  id: number;
  uid: number;
  start: string; // Using ISO string format for date
  stop: string; // Using ISO string format for date
  detail: string;
}
