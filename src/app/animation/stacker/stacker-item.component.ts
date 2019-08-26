import { Component, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { StackerService } from './stacker.service';

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
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private stackerService: StackerService) { }

  ngOnInit() {
    const className = 'stacker-item';
    this.renderer.addClass(
      this.elementRef.nativeElement,
      className
    );

    (this.elementRef.nativeElement as HTMLElement).addEventListener('click', () => this.selected());
  }

  ngOnDestroy() {
    (this.elementRef.nativeElement as HTMLElement).removeEventListener('click', this.selected);
  }

  selected() {
    this.stackerService.elementSelected.next(this.elementRef.nativeElement);
  }
}
