import { Component, OnInit } from '@angular/core';
import { PrettyBoxEffects } from '../../../animation/prettybox/prettyeffect';

@Component({
  selector: 'app-prettybox-container',
  templateUrl: './prettybox-container.component.html',
  styleUrls: ['./prettybox-container.component.scss']
})
export class PrettyboxContainerComponent implements OnInit {

  PrettyBoxEffects = PrettyBoxEffects;

  constructor() { }

  ngOnInit() {
  }

}
