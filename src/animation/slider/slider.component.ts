import { Component, Input, OnInit, ElementRef, Renderer2, OnDestroy, OnChanges, SimpleChanges, ViewChild, HostListener } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Orientations } from './slider_orientation';

@Component({
  selector: 'before-after',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnChanges, OnDestroy {
  Effects = Orientations;

  effect$ = new Subject<Orientations>();
  stop$ = new Subject<void>();
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.effect$.pipe(takeUntil(this.stop$)).subscribe(orientation => {
      this.renderer.addClass(
        this.elementRef.nativeElement,
        'effect-' + orientation.toString()
      );
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.containerWidth}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${this.containerHeight}px`);
    });
  }

  @Input() orientation = Orientations.Horizontal;
  @Input() start = 50;
  @ViewChild('scroller')
  scroller: ElementRef;

  containerWidth = 600;
  containerHeight = 400;

  scrollX = 50;
  scrollY = 50;
  afterWidth = 100;
  afterHeight = 100;

  moving = false;

  mouseDown(event: MouseEvent) {
    if (event.target !== this.scroller.nativeElement)
      return;
    this.moving = true;
  }

  mouseMove(event: MouseEvent) {
    event.preventDefault();
    if (!this.moving)
      return;
    let { x, y } = event;
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    if (this.orientation === Orientations.Horizontal) {
      if (y < 0)
        y = 0;
      if (y > this.containerHeight)
        y = this.containerHeight;
      this.scrollY = y - 15;
      this.afterHeight = y;
    } else {
      if (x < 0)
        x = 0;
      if (x > this.containerWidth)
        x = this.containerWidth;
      this.scrollX = x - 15;
      this.afterWidth = x;
    }
  }

  mouseUp() {
    this.moving = false;
  }

  ngOnInit() {
    this.effect$.next(this.orientation);
    if (this.orientation === Orientations.Horizontal) {
      this.afterHeight = this.containerHeight * (this.start / 100);
      this.afterWidth = this.containerWidth;
      this.scrollX = this.containerWidth / 2 - 15;
      this.scrollY = this.containerHeight * (this.start / 100) - 15;
    } else {
      this.afterWidth = this.containerWidth * (this.start / 100);
      this.afterHeight = this.containerHeight;
      this.scrollY = this.containerHeight / 2 - 15;
      this.scrollX = this.containerWidth * (this.start / 100) - 15;
    }

    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }
  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.effect) {
      this.effect$.next(changes.orientation.currentValue);
    }
  }
}
