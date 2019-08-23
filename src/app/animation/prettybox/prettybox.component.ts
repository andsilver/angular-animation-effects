import { Component, Input, OnInit, ElementRef, Renderer2, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { PrettyBoxEffects } from './prettyeffect';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'pretty-box',
  templateUrl: './prettybox.component.html',
  styleUrls: ['./prettybox.component.scss']
})
export class PrettyboxComponent  implements OnInit, OnChanges, OnDestroy {

  Effects = PrettyBoxEffects;

  effect$ = new Subject<PrettyBoxEffects>();
  stop$ = new Subject<void>();

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.effect$.pipe(takeUntil(this.stop$)).subscribe(effect => {
      this.renderer.addClass(
        this.elementRef.nativeElement,
        'effect-' + effect.toString()
      );
    });
  }

  @Input() effect = PrettyBoxEffects.Apollo;

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
}
