import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'before',
  template: '<ng-content></ng-content>',
  styles: [`
  :host {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }`]
})
export class SliderBeforeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
