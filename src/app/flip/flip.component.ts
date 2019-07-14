import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
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
    trigger('flip', [
      state('in', style({ transform: 'rotateY(180deg)' })),
      transition('void => in', animate(100))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlipComponent implements OnInit {
  sideAStyle;
  sideBStyle;

  state = '';

  constructor() {}

  @Input() effect;

  ngOnInit() {
    if (this.effect === FlipBoxEffects.Flip) {
      this.sideBStyle = 'transform: rotateY(180deg)';
    }
  }

  onEnter() {
    this.state = 'in';
  }

  onLeave() {
    this.state = '';
  }
}
