import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [
    /*Angular 14, SAC, 2022*/
    /*AppComponent*/
  ],
  imports: [BrowserModule],
  providers: [provideAnimationsAsync(),provideHttpClient(),provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
