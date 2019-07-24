import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'flip-box-sideA',
  template: '<ng-content></ng-content>',
  styles: [`
  :host {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }`]
})
export class FlipBoxSideAComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
