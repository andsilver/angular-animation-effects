import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  HostListener,
  ElementRef,
  Renderer2,
  HostBinding
} from '@angular/core';
import {
  trigger,
  style,
  state,
  transition,
  animate
} from '@angular/animations';
import { FlipBoxEffects } from './effects';

@Component({
  selector: 'flip-box',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.scss'],
  animations: [
    trigger('content', [
      state('flip-in', style({ transform: 'rotateY(180deg)' })),
      transition('* => *', animate(500))
    ]),
    trigger('sideB', [
      state('slide-in', style({ transform: 'translate3d(0, 0, 0)' })),
      transition('* => *', animate(200))
    ])
  ]
})
export class FlipComponent implements OnInit {
  prefix: string;

  contentState = '';
  sideBState = '';
  Effects = FlipBoxEffects;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {}

  @Input() effect;

  @HostBinding('@content')
  get getContentState(): string {
    return this.contentState;
  }

  ngOnInit() {
    if (this.effect === FlipBoxEffects.Flip) {
      this.prefix = 'flip';
    }
    if (this.effect === FlipBoxEffects.SlideLeft) {
      this.prefix = 'slide-left';
    }
    if (this.effect === FlipBoxEffects.SlideRight) {
      this.prefix = 'slide-right';
    }
    if (this.effect === FlipBoxEffects.SlideTop) {
      this.prefix = 'slide-top';
    }
    if (this.effect === FlipBoxEffects.SlideBottom) {
      this.prefix = 'slide-bottom';
    }
    if (this.effect === FlipBoxEffects.Push) {
      this.prefix = 'push';
    }
    if (this.effect === FlipBoxEffects.ZoomIn) {
      this.prefix = 'zoom-in';
    }
    if (this.effect === FlipBoxEffects.ZoomOut) {
      this.prefix = 'zoom-out';
    }
    if (this.effect === FlipBoxEffects.Fade) {
      this.prefix = 'fade';
    }

    this.renderer.addClass(this.elementRef.nativeElement, 'effect-' + this.prefix);
  }

  @HostListener('mouseover')
  onEnter(event: MouseEvent) {
    if (this.effect === FlipBoxEffects.Flip) {
      this.contentState = 'flip-in';
    }
    if (
      this.effect === FlipBoxEffects.SlideLeft ||
      this.effect === FlipBoxEffects.SlideRight ||
      this.effect === FlipBoxEffects.SlideTop ||
      this.effect === FlipBoxEffects.SlideBottom ||
      this.effect === FlipBoxEffects.Push
    ) {
      this.sideBState = 'slide-in';
    }
  }

  @HostListener('mouseleave')
  onLeave(event: AnimationEvent) {
    this.contentState = '';
    this.sideBState = '';
  }
}
