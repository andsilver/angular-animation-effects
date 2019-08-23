import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pretty-box-background',
  template: '<ng-content></ng-content>',
  styles: [`
  :host {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }`]
})
export class PrettyBoxBackgroundComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
