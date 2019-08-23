import { Component, OnInit } from '@angular/core';
import { FlipBoxEffects } from '../../animation/flip/effects';

@Component({
  selector: 'app-flip-container',
  templateUrl: './flip-container.component.html',
  styleUrls: ['./flip-container.component.scss']
})
export class FlipContainerComponent implements OnInit {

  FlipBoxEffects = FlipBoxEffects;

  constructor() { }

  ngOnInit() {
  }

}
