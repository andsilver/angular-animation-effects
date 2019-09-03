import { Component, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
// import { StackerService } from './stacker.service';

@Component({
  selector: 'stacker-item',
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
export class StackerItemComponent implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const className = 'stacker-item';
    this.renderer.addClass(
      this.elementRef.nativeElement,
      className
    );
  }

  ngOnDestroy() {}
}
