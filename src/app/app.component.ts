import { Component } from '@angular/core';
import { FlipBoxEffects } from '../animation/flip/effects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  effects = FlipBoxEffects;
}
