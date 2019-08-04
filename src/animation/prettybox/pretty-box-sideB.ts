import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pretty-box-sideB',
  template: '<ng-content></ng-content>',
  styles: [`
  :host {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }`]
})
export class PrettyBoxSideBComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}