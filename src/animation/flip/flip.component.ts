import {
  Component,
  Input,
  OnInit,
  HostListener,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';

import { FlipBoxEffects } from './effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'flip-box',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.scss'],
})
export class FlipComponent implements OnInit, OnChanges, OnDestroy {

  Effects = FlipBoxEffects;

  effect$ = new Subject<FlipBoxEffects>();
  stop$ = new Subject<void>();

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.effect$.pipe(takeUntil(this.stop$)).subscribe(effect => {
      this.renderer.addClass(
        this.elementRef.nativeElement,
        'effect-' + effect.toString()
      );
    });
  }

  @Input() effect = FlipBoxEffects.FlipHorizontal;

  ngOnInit() {
    this.effect$.next(this.effect);
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.effect) {
      this.effect$.next(changes.effect.currentValue);
    }
  }

  @HostListener('mouseover')
  onEnter(event: MouseEvent) {

  }

  @HostListener('mouseleave')
  onLeave(event: MouseEvent) {
  }
}
