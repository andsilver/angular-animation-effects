import { Component, OnInit } from '@angular/core';
import { StackerEffects } from 'src/app/animation/stacker/stacker-effects';

@Component({
  selector: 'app-stacker-container',
  templateUrl: './stacker-container.component.html',
  styleUrls: ['./stacker-container.component.scss']
})
export class StackerContainerComponent implements OnInit {

  StackerEffects = StackerEffects;

  constructor() { }

  ngOnInit() {
  }

}
