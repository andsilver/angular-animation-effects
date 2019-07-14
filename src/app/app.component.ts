import { Component } from '@angular/core';
import { FlipBoxEffects } from './flip/effects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  flip = false;
  effects = FlipBoxEffects;
  rotate() {
    this.flip = !this.flip;
  }
}
