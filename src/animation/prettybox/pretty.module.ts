import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrettyboxComponent } from './prettybox.component';
import { PrettyBoxSideAComponent } from './pretty-box-sideA';
import { PrettyBoxSideBComponent } from './pretty-box-sideB';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [PrettyboxComponent, PrettyBoxSideAComponent, PrettyBoxSideBComponent],
  declarations: [PrettyboxComponent, PrettyBoxSideAComponent, PrettyBoxSideBComponent]
})
export class PrettyBoxModule { }