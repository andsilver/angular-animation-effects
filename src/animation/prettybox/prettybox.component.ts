import { ChangeDetectionStrategy, Component, Input, OnInit, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { PrettyBoxEffects } from './prettyeffect';

@Component({
  selector: 'pretty-box',
  templateUrl: './prettybox.component.html',
  styleUrls: ['./prettybox.component.scss']
})
export class PrettyboxComponent implements OnInit {
  prefix: string;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) { }
  @Input() effect;
  ngOnInit() {
    if (this.effect === PrettyBoxEffects.Steve) {
      this.prefix = 'steve';
    }
    if (this.effect === PrettyBoxEffects.Goliath) {
      this.prefix = 'goliath';
    }
    if (this.effect === PrettyBoxEffects.Duke) {
      this.prefix = 'duke'
    }
    if (this.effect === PrettyBoxEffects.Apollo) {
      this.prefix = 'apollo'
    }
    this.renderer.addClass(
      this.elementRef.nativeElement,
      'effect-' + this.prefix
    );
  }
}
