import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'stack-item',
  template: '<ng-content></ng-content>',
  styles: [`
  :host {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    transition: all ease .3s;
  }`]
})
export class StackItemComponent implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const className = 'stack-item';
    this.renderer.addClass(
      this.elementRef.nativeElement,
      className
    );
  }
}
