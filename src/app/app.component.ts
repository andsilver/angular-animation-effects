import { Component } from '@angular/core';
import { FlipBoxEffects } from '../animation/flip/effects';
import { PrettyBoxEffects } from 'src/animation/prettybox/prettyeffect';
import { Orientations } from '../animation/slider/slider_orientation'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  FlipBoxEffects = FlipBoxEffects;
  PrettyBoxEffects = PrettyBoxEffects;
  Orientations = Orientations;
}
