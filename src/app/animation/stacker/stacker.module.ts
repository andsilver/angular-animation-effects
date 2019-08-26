import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackerComponent } from './stacker.component';
import { StackerItemComponent } from './stacker-item.component';
import { StackerService } from './stacker.service';

@NgModule({
  declarations: [
    StackerComponent,
    StackerItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StackerComponent,
    StackerItemComponent
  ],
  providers: [
    StackerService
  ]
})
export class StackerModule { }
