import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrettyboxComponent } from './prettybox.component';
import { PrettyBoxBackgroundComponent } from './pretty-box-background';
import { PrettyBoxContentComponent } from './pretty-box-content';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [PrettyboxComponent, PrettyBoxBackgroundComponent, PrettyBoxContentComponent],
  declarations: [PrettyboxComponent, PrettyBoxBackgroundComponent, PrettyBoxContentComponent]
})
export class PrettyBoxModule { }
