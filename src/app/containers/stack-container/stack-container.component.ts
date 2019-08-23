import { Component, OnInit } from '@angular/core';
import { StackEffects } from 'src/app/animation/stack/stack-effects';

@Component({
  selector: 'app-stack-container',
  templateUrl: './stack-container.component.html',
  styleUrls: ['./stack-container.component.scss']
})
export class StackContainerComponent implements OnInit {

  StackEffects = StackEffects;

  constructor() { }

  ngOnInit() {
  }

}
