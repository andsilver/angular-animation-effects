import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pretty-box-sideA',
  template: '<ng-content></ng-content>',
  styles: [`
  :host {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }`]
})
export class PrettyBoxSideAComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}