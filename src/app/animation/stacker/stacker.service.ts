import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface StackerStatus {
  hoverIndex: number;
  active: boolean;
}

@Injectable()
export class StackerService {
  hoverIndex: number;
  activation: Subject<StackerStatus> = new Subject<StackerStatus>();
  elementSelected: Subject<HTMLElement> = new Subject<HTMLElement>();

  constructor() { }
}
