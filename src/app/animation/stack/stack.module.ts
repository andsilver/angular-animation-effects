import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackComponent } from './stack.component';
import { StackItemComponent } from './stack-item.component';

@NgModule({
  declarations: [
    StackComponent,
    StackItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StackComponent,
    StackItemComponent
  ]
})
export class StackModule { }
