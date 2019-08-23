import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlipComponent } from './flip.component';
import { FlipBoxSideAComponent } from './flip-box-side-a.component';
import { FlipBoxSideBComponent } from './flip-box-side-b.component';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [FlipComponent, FlipBoxSideAComponent, FlipBoxSideBComponent],
  declarations: [FlipComponent, FlipBoxSideAComponent, FlipBoxSideBComponent]
})
export class FlipModule {}
