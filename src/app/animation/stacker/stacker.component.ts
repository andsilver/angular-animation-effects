import { Component, OnInit, Input, ElementRef, Renderer2, ViewChildren, AfterViewInit, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { StackerEffects } from './stacker-effects';
import { StackerService } from './stacker.service';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

interface EffectItem {
  index: number;
  element: HTMLElement;
  position: number;
}

@Component({
  selector: 'stacker',
  templateUrl: './stacker.component.html',
  styleUrls: ['./stacker.component.scss']
})
export class StackerComponent implements OnInit, AfterViewInit {
  StackerEffects = StackerEffects;

  @Input()
  effect = StackerEffects.Fanout;

  @Output()
  animationend = new EventEmitter();

  activeChanges = new Subject<boolean>();
  isActive: boolean = false;
  elements: EffectItem[] = [];
  selectedIndex = 0;
  subscriptions: Subscription[] = [];

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private stacker: StackerService) { }

  ngOnInit() {
    this.watchActivation();
    this.watchSelection();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const items = this.elementRef.nativeElement.getElementsByClassName('stacker-item');
      for (let i = 0; i < items.length; i++) {
        const element = items.item(i);
        this.elements.push({
          element,
          index: i,
          position: 0
        });
        this.renderer.setStyle(element, 'z-index', this.selectedIndex === i ? 99 : 0);

        (element as HTMLElement).addEventListener('mouseover', () => this.activeChanges.next(true));
        (element as HTMLElement).addEventListener('mouseleave', () => this.activeChanges.next(false));
      }
    });
  }

  watchSelection() {
    this.subscriptions.push(
      this.stacker.elementSelected.subscribe(item => {
        const index = this.elements.findIndex(el => el.element === item);
        this.selectItem(index);
      })
    );
  }

  watchActivation() {
    this.subscriptions.push(
      this.activeChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(status => {
        this.isActive = status;
        status ? this.active() : this.deactive();
      })
    );
  }

  selectItem(index: number) {
    this.selectedIndex = index;
    this.active();
    this.animationend.emit(this.selectedIndex);
  }

  active() {
    const center = Math.floor(this.elements.length / 2);
    for (let i = 1; i <= center; i++) {
      let pos = this.selectedIndex - i;
      if (pos < 0) pos = this.elements.length + pos;
      const item = this.elements[pos];
      item.position = center - i;
      this.setActiveStyle(i, 'left', item.element);
    }

    for (let i = 1; i < this.elements.length - center; i++) {
      let pos = this.selectedIndex + i;
      if (pos >= this.elements.length) pos = pos - this.elements.length;
      const item = this.elements[pos];
      item.position = center + i;
      this.setActiveStyle(i, 'right', item.element);
    }

    const selectedItem = this.elements[this.selectedIndex];
    this.setDeactiveStyle(selectedItem.element, this.selectedIndex);
    this.setActiveStyle(null, 'center', selectedItem.element);
    selectedItem.position = center;
  }

  deactive() {
    this.elements.forEach((el, index) => {
      this.setDeactiveStyle(el.element, index);
    });
  }

  setActiveStyle(index: number, direction: 'left' | 'right' | 'center', item: HTMLElement) {
    this.renderer.setStyle(item, 'box-shadow', '0px 7px 17px 3px #0000006b');
    const transform = 'scale(0.9)' + direction !== 'center' ? ` rotate(${direction === 'left' ? -index * 10 : index * 10}deg)` : '';
    this.renderer.setStyle(item, 'transform', transform);
    if (direction !== 'center') {
      this.renderer.setStyle(item, 'left', `${direction === 'left' ? -index * 100 : index * 100}px`);
      this.renderer.setStyle(item, 'top', `${index * 20}px`);
      this.renderer.setStyle(item, 'z-index', `${90 - index}`);
      this.renderer.setStyle(item, 'opacity', 1);
    }
  }

  setDeactiveStyle(item: HTMLElement, index: number) {
    this.renderer.setStyle(item, 'top', 0);
    this.renderer.setStyle(item, 'left', 0);
    this.renderer.setStyle(item, 'transform', 'scale(1)');
    this.renderer.setStyle(item, 'z-index', index === this.selectedIndex ? 99 : 0);
    this.renderer.setStyle(item, 'opacity', index === this.selectedIndex ? 1 : 0);
    this.renderer.removeStyle(item, 'box-shadow');
  }
}
