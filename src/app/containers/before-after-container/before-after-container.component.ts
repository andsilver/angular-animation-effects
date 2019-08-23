import { Component, OnInit } from '@angular/core';
import { Orientations } from '../../animation/slider/slider_orientation';

@Component({
  selector: 'app-before-after-container',
  templateUrl: './before-after-container.component.html',
  styleUrls: ['./before-after-container.component.scss']
})
export class BeforeAfterContainerComponent implements OnInit {

  Orientations = Orientations;

  constructor() { }

  ngOnInit() {
  }

}
