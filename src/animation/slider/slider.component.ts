import { Component, Input, OnInit, ElementRef, Renderer2, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
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
    });
  }

  @Input() orientation = Orientations.Horizontal;


  ngOnInit() {
    this.effect$.next(this.orientation);
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
