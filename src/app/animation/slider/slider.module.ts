import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SliderComponent } from './slider.component';
import { SliderAfterComponent } from './slider_after';
import { SliderBeforeComponent } from './slider_before';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [SliderComponent, SliderAfterComponent, SliderBeforeComponent],
  declarations: [SliderComponent, SliderAfterComponent, SliderBeforeComponent]
})
export class SliderModule { }