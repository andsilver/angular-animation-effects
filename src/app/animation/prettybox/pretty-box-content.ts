import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pretty-box-content',
  template: '<ng-content></ng-content>',
  styles: [`
  :host {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }`]
})
export class PrettyBoxContentComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
