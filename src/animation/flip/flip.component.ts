import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  HostListener
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
  sideAStyle;
  sideBStyle;
  prefix: string;

  contentState = '';
  sideBState = '';
  Effects = FlipBoxEffects;
  constructor() {}

  @Input() effect;

  ngOnInit() {
    if (this.effect === FlipBoxEffects.Flip) {
      this.sideBStyle = 'transform-rotateY-180';
      this.prefix = 'flip';
    }
    if (this.effect === FlipBoxEffects.Slide) {
      this.sideBStyle = 'transform-translate3d-x';
      this.prefix = 'slide';
    }
    if (this.effect === FlipBoxEffects.Push) {
      this.sideBStyle = 'transform-translate3d-y';
      this.prefix = 'slide';
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
    if (this.effect === FlipBoxEffects.Highlight) {
      this.prefix = 'highlight';
      this.sideBStyle = 'transform-translate3d-y';
    }
  }

  onEnter(event: MouseEvent) {
    if (this.effect === FlipBoxEffects.Flip) {
      this.contentState = 'flip-in';
    }
    if (
      this.effect === FlipBoxEffects.Slide ||
      this.effect === FlipBoxEffects.Push ||
      this.effect === FlipBoxEffects.Highlight
    ) {
      this.sideBState = 'slide-in';
    }
  }

  onLeave(event: AnimationEvent) {
    this.contentState = '';
    this.sideBState = '';
  }
}
