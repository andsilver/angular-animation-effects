import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlipModule } from '../animation/flip/flip.module';
import { PrettyBoxModule } from '../animation/prettybox/pretty.module';
import { SliderModule } from '../animation/slider/slider.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FlipModule, PrettyBoxModule, BrowserAnimationsModule, SliderModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
