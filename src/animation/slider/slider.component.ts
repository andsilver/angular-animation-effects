import { Component, Input, OnInit, ElementRef, Renderer2, OnDestroy, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Orientations } from './slider_orientation';

@Component({
  selector: 'before-after',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  Effects = Orientations;

  effect$ = new Subject<Orientations>();
  stop$ = new Subject<void>();
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.effect$.pipe(takeUntil(this.stop$)).subscribe(orientation => {
      const className = 'effect-' + orientation.toString();
      this.renderer.addClass(
        this.elementRef.nativeElement,
        className
      );
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${this.height}px`);
    });
  }

  @Input() orientation = Orientations.Horizontal;
  @Input() start = 50;
  @Input() labelVisibility = "normal";
  @Input() width = 600;
  @Input() height = 400;

  @ViewChild('scroller')
  scroller: ElementRef;

  scrollX = 50;
  scrollY = 50;
  afterWidth = 0;
  afterHeight = 0;

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
      if (y > this.height)
        y = this.height;
      this.scrollY = y - 15;
      this.afterHeight = y;
    } else {
      if (x < 0)
        x = 0;
      if (x > this.width)
        x = this.width;
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
      this.afterHeight = this.height * (this.start / 100);
      this.afterWidth = this.width;
      this.scrollX = this.width / 2 - 15;
      this.scrollY = this.height * (this.start / 100) - 15;
    }
    if (this.orientation === Orientations.Vertical) {
      this.afterWidth = this.width * (this.start / 100);
      this.afterHeight = this.height;
      this.scrollY = this.height / 2 - 15;
      this.scrollX = this.width * (this.start / 100) - 15;
    }

    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  ngAfterViewInit() {
    document.querySelectorAll(`.effect-${this.orientation} img`).forEach(item => {
      this.renderer.setAttribute(item, 'width', `${this.width}px`);
      this.renderer.setAttribute(item, 'height', `${this.height}px`);
    });
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
