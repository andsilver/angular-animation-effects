import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackerComponent } from './stacker.component';
import { StackerItemComponent } from './stacker-item.component';

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
  ]
})
export class StackerModule { }
