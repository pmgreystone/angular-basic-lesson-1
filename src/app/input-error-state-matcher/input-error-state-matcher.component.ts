import { Component } from '@angular/core';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { Output, EventEmitter } from '@angular/core';

// Error when invalid control is dirty, touched, or submitted
export class InputErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-input-error-state-matcher',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './input-error-state-matcher.component.html',
  styleUrl: './input-error-state-matcher.component.css'
})
export class InputErrorStateMatcherComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]);
  matcher = new InputErrorStateMatcher();
  private defaultHintLabel = "Please enter an email address"
  private isEmailValid = false
  get hintLabel(): string {
    return this.isEmailValid ? "" : this.defaultHintLabel;
  }
  /*Angular 2, IOD, 2016*/
  @Output() newItemEvent = new EventEmitter<boolean>();
  private emailString: string | null = ""
  get emailStringProp(): string {
    return this.emailString ? this.emailString : "";
  }

  onEmailUpdate(): void {
    const value: string | null = this.emailFormControl.value; // value type can be string or null
    this.emailString = value;
    if (this.emailFormControl.status === 'VALID' && value) {
      this.isEmailValid = true;
    } else {
      this.isEmailValid = false;
    }
    this.newItemEvent.emit(this.isEmailValid);
  }
}