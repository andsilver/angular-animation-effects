import { Component, OnInit, Input, ElementRef, Renderer2, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { StackerEffects } from './stacker-effects';
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
export class StackerComponent implements OnInit, AfterViewInit, OnDestroy {
  StackerEffects = StackerEffects;

  @Input()
  effect = StackerEffects.Fanout;

  @Input()
  width: string = `300px`;

  @Input()
  height: string = `200px`;

  @Output()
  animationend = new EventEmitter();

  activeChanges = new Subject<boolean>();
  isActive: boolean = false;
  elements: EffectItem[] = [];
  selectedIndex = 0;
  subscriptions: Subscription[] = [];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.width);
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.height);
    this.watchActivation();
  }

  ngOnDestroy() {
    this.elements.forEach((item) => item.element.remove());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const items = this.elementRef.nativeElement.getElementsByClassName('stacker-item');
      for (let i = 0; i < items.length; i++) {
        const element = items.item(i);
        this.elements.push({ element, index: i, position: i });
        (element as HTMLElement).addEventListener('mouseover', () => this.activeChanges.next(true));
        (element as HTMLElement).addEventListener('mouseleave', () => this.activeChanges.next(false));
        (element as HTMLElement).addEventListener('click', () => this.selectItem(i));
      }
      this.initialize();
    });
  }

  watchActivation() {
    this.subscriptions.push(
      this.activeChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(status => {
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

  initialize() {
    switch (this.effect) {
      case StackerEffects.Fanout:
      case StackerEffects.SideGrid:
        this.elements.forEach((el, index) => {
          this.renderer.setStyle(el.element, 'z-index', this.selectedIndex === index ? 99 : 0);
        });
        break;

      case StackerEffects.SimpleSpread:
      case StackerEffects.RandomRotation:
      case StackerEffects.Queue:
      case StackerEffects.ElasticSpread:
      case StackerEffects.VerticalSpread:
        this.elements.forEach((el, index) => {
          this.renderer.setStyle(el.element, 'z-index', 99 - index);
        });
        break;

      case StackerEffects.SideSlide:
        this.handleCentralizedEffect(false);
        break;

      case StackerEffects.PeekaBoo:
      case StackerEffects.Fan:
        this.elements.forEach((el, index) => {
          this.setDeactiveStyle(el.element, index);
        });
        break;

      case StackerEffects.PreviewGrid:
        const margin = 8;
        const width = (this.elementRef.nativeElement as HTMLElement).offsetWidth;
        const height = (this.elementRef.nativeElement as HTMLElement).offsetHeight;

        this.elements.forEach((el, i) => {
          let index = i - this.selectedIndex;
          if (index < 0)
            index += this.elements.length;
          // this.
        });
        break;

      case StackerEffects.Leaflet:
      case StackerEffects.Coverflow:
        this.renderer.setStyle(this.elementRef.nativeElement, 'perspective', '1600px');
        this.elements.forEach((el, index) => {
          this.renderer.setStyle(el.element, 'z-index', Math.abs(this.elements.length - index - 1));
          this.renderer.setStyle(el.element, 'transform-style', 'preserve-3d');
          this.renderer.setStyle(el.element, 'transform-origin', 'top center');
          if (this.effect === this.StackerEffects.Leaflet)
            this.renderer.setStyle(el.element, 'transform', 'rotateX(0deg)');
          else
            this.renderer.setStyle(el.element, 'transform', 'rotateY(0deg) scale(1)');
        });
        break;
    }
  }

  deactive() {
    switch (this.effect) {
      case StackerEffects.Fanout:
      case StackerEffects.SimpleSpread:
      case StackerEffects.RandomRotation:
      case StackerEffects.SideGrid:
      case StackerEffects.PeekaBoo:
      case StackerEffects.Queue:
      case StackerEffects.Fan:
      case StackerEffects.ElasticSpread:
      case StackerEffects.VerticalSpread:
      case StackerEffects.Leaflet:
      case StackerEffects.Coverflow:
        this.elements.forEach((el, index) => {
          this.setDeactiveStyle(el.element, index);
        });
        break;
      case StackerEffects.SideSlide:
        this.handleCentralizedEffect(false);
        break;
    }
  }

  /**
   * When mouseover
   */
  active() {
    let center = Math.floor(this.elements.length / 2);
    switch (this.effect) {
      case StackerEffects.Fanout:
        this.handleCentralizedEffect(true);
        break;

      case StackerEffects.SimpleSpread:
        this.elements.forEach((el, i) => {
          let index;
          index = i - this.selectedIndex;
          if (index < 0)
            index = this.elements.length + index;
          if (index < center)
            this.setActiveStyle(el.element, center - index, 'left');
          else if (index > center)
            this.setActiveStyle(el.element, index - center, 'right');
          else
            this.setActiveStyle(el.element, 0, 'center');
          el.position = index;
        });
        break;

      case StackerEffects.RandomRotation:
        this.elements.forEach((el, i) => {
          let index;
          index = i - this.selectedIndex;
          if (index < 0)
            index = this.elements.length + index;
          if (index === 0)
            this.setActiveStyle(el.element, 0, 'center');
          else
            this.setActiveStyle(el.element, index, index % 2 === 1 ? 'left' : 'right');
          el.position = index;
        });
        break;

      case StackerEffects.SideSlide:
        this.handleCentralizedEffect(true);
        break;

      case StackerEffects.SideGrid:
        const margin = 8;
        const width = (this.elementRef.nativeElement as HTMLElement).offsetWidth;
        const height = (this.elementRef.nativeElement as HTMLElement).offsetHeight;
        const p = {
          width: (width - margin) / 2,
          height: (height - margin) / 2,
          left: 0
        };
        const rows = Math.ceil(this.elements.length / 2);
        const total = rows * p.width + (rows - 1) * margin;
        const left = width / 2 - total / 2;
        this.elements.forEach((el, i) => {
          let index = i - this.selectedIndex;
          if (index < 0)
            index += this.elements.length;
          p.left = left + (p.width + margin) * (index < rows ? index : index - rows) - margin;
          if (index < rows)
            this.setActiveStyle(el.element, -1, 'top', p);
          else
            this.setActiveStyle(el.element, -1, 'bottom', p);
          el.position = index;
        });
        break;

      case StackerEffects.PeekaBoo:
        center = Math.ceil(this.elements.length / 2);
        this.elements.forEach((el, i) => {
          let index = i - this.selectedIndex;
          if (index < 0)
            index += this.elements.length;
          if (index === 0)
            this.setActiveStyle(el.element, 0, 'center');
          else
            this.setActiveStyle(el.element, Math.abs(center - index), index < center ? 'left' : 'right');
          el.position = index;
        });
        break;

      case StackerEffects.Queue:
        this.elements.forEach((el, i) => {
          let index;
          index = i - this.selectedIndex;
          if (index < 0)
            index = this.elements.length + index;
          this.setActiveStyle(el.element, index, 'center');
          el.position = index;
        });
        break;

      case StackerEffects.Fan:
      case StackerEffects.ElasticSpread:
      case StackerEffects.VerticalSpread:
      case StackerEffects.Leaflet:
      case StackerEffects.Coverflow:
        this.elements.forEach((el, i) => {
          let index;
          index = i - this.selectedIndex;
          if (index < 0)
            index = this.elements.length + index;
          this.setActiveStyle(el.element, Math.abs(this.elements.length - index - 1), 'center');
          el.position = index;
        });
        break;
    }
  }


  /**
   * Set style on an item when it's activated
   */
  setActiveStyle(item: HTMLElement, index: number, d: 'left' | 'right' | 'center' | 'top' | 'bottom', p?) {
    this.renderer.setStyle(item, 'box-shadow', '0px 7px 17px 3px #0000006b');
    this.renderer.setStyle(item, 'opacity', 1);

    switch (this.effect) {

      case StackerEffects.Fanout:
        const transform = 'scale(0.9)' + d !== 'center' ? ` rotate(${d === 'left' ? -index * 10 : index * 10}deg)` : '';
        this.renderer.setStyle(item, 'transform', transform);
        if (d === 'center') return;
        this.renderer.setStyle(item, 'left', `${d === 'left' ? -index * 100 : index * 100}px`);
        this.renderer.setStyle(item, 'top', `${index * 20}px`);
        this.renderer.setStyle(item, 'z-index', `${90 - index}`);
        break;

      case StackerEffects.SimpleSpread:
        if (d === 'center') {
          this.renderer.setStyle(item, 'left', 0);
          this.renderer.setStyle(item, 'top', 0);
          this.renderer.setStyle(item, 'z-index', 50);
        } else {
          this.renderer.setStyle(item, 'left', `${d === 'left' ? -index * 25 : index * 25}px`);
          this.renderer.setStyle(item, 'top', `${d === 'left' ? index * 25 : index * -25}px`);
          this.renderer.setStyle(item, 'z-index', 50 + (d === 'left' ? index : -index));
        }
        break;

      case StackerEffects.RandomRotation:
        if (d === 'center') {
          this.renderer.setStyle(item, 'left', `30px`);
          this.renderer.setStyle(item, 'top', `30px`);
          this.renderer.setStyle(item, 'z-index', 99);
          this.renderer.setStyle(item, 'transform', 'rotate(0deg)')
        } else {
          this.renderer.setStyle(item, 'transform', `rotate(${d === 'left' ? index * 5 : -index * 5}deg)`)
          this.renderer.setStyle(item, 'z-index', 99 - index);
          this.renderer.setStyle(item, 'left', 0);
          this.renderer.setStyle(item, 'top', 0);
        }
        break;

      case StackerEffects.SideSlide:
        this.renderer.setStyle(item, 'opacity', 1);
        if (d === 'center') {
          this.renderer.setStyle(item, 'transform', 'scale(0.9)');
          this.renderer.setStyle(item, 'z-index', 99);
          this.renderer.setStyle(item, 'left', 0);
          return;
        }
        this.renderer.setStyle(item, 'transform', `scale(${1 - 0.15 * index})`);
        this.renderer.setStyle(item, 'left', `${d === 'left' ? -index * 50 : index * 50}px`);
        this.renderer.setStyle(item, 'z-index', `${90 - index}`);
        break;

      case StackerEffects.SideGrid:
        this.renderer.setStyle(item, 'width', `${p.width}px`);
        this.renderer.setStyle(item, 'height', `${p.height}px`);
        this.renderer.setStyle(item, 'left', `${p.left}px`);
        this.renderer.setStyle(item, 'top', d === 'top' ? 0 : `${p.height + 4}px`);
        break;

      case StackerEffects.PeekaBoo:
        if (d === 'center') {
          this.renderer.setStyle(item, 'transform', 'scale(0.9)');
          this.renderer.setStyle(item, 'left', 0);
          this.renderer.setStyle(item, 'z-index', 99);
          this.renderer.setStyle(item, 'top', 0);
          this.renderer.setStyle(item, 'transform-origin', 'bottom center');
        } else {
          this.renderer.setStyle(item, 'transform', `scale(0.5) rotate(${d === 'left' ? -index * 30 : index * 30}deg)`);
          this.renderer.setStyle(item, 'left', `${d === 'left' ? -index * 80 : index * 80}px`);
          this.renderer.setStyle(item, 'top', '-50px');
          this.renderer.setStyle(item, 'z-index', d === 'left' ? 90 + index : 90 - index);
          this.renderer.removeStyle(item, 'transform-origin');
        }
        break;

      case StackerEffects.Queue:
        this.renderer.setStyle(item, 'z-index', 99 - index);
        this.renderer.setStyle(item, 'transform', `scale(${0.9 - 0.08 * index})`);
        this.renderer.setStyle(item, 'top', `${-index * 20}px`);
        break;

      case StackerEffects.Fan:
        this.renderer.setStyle(item, 'z-index', index);
        this.renderer.setStyle(item, 'transform-origin', 'top left');
        this.renderer.setStyle(item, 'transform', `rotate(${index * 5}deg)`);
        this.renderer.setStyle(item, 'transition-delay', `.${this.elements.length - 1 - index}s`);
        break;

      case StackerEffects.ElasticSpread:
        this.renderer.setStyle(item, 'z-index', index);
        this.renderer.setStyle(item, 'top', `${index * 35}px`);
        setTimeout(() => {
          this.renderer.setStyle(item, 'top', `${index * 30}px`);
          this.renderer.setStyle(item, 'transition', 'all .1s');
        }, 300);
        break;

      case StackerEffects.VerticalSpread:
        this.renderer.setStyle(item, 'z-index', index);
        this.renderer.setStyle(item, 'transition-delay', `.${this.elements.length - 1 - index}s`);
        this.renderer.setStyle(item, 'top', `${index * 30}px`);
        break;

      case StackerEffects.Leaflet:
        this.renderer.setStyle(item, 'z-index', index);
        this.renderer.setStyle(item, 'transform', `rotateX(${index ? 15 + index * 10 : 0}deg)`);
        this.renderer.setStyle(item, 'transition-delay', `.${this.elements.length - 1 - index}s`);
        break;

      case StackerEffects.Coverflow:
        const center = Math.ceil(this.elements.length / 2);
        const margin = center - index;
        this.renderer.setStyle(item, 'z-index', index);
        this.renderer.setStyle(item, 'transform', 'rotateY(-45deg) scale(0.9)');
        this.renderer.setStyle(item, 'left', `${margin * 50}px`);
        break;
    }
  }

  /**
   * Set style on an item when it's deactivated
   */
  setDeactiveStyle(item: HTMLElement, index: number, d?: 'left' | 'right' | 'center') {
    this.renderer.removeStyle(item, 'box-shadow');

    switch (this.effect) {

      case StackerEffects.Fanout:
        this.renderer.setStyle(item, 'top', 0);
        this.renderer.setStyle(item, 'left', 0);
        this.renderer.setStyle(item, 'transform', 'scale(1)');
        this.renderer.setStyle(item, 'z-index', index === this.selectedIndex ? 99 : 0);
        this.renderer.setStyle(item, 'opacity', index === this.selectedIndex ? 1 : 0);
        break;

      case StackerEffects.SimpleSpread:
      case StackerEffects.RandomRotation:
        this.renderer.setStyle(item, 'top', 0);
        this.renderer.setStyle(item, 'left', 0);
        this.renderer.setStyle(item, 'transform', 'scale(1)');
        break;

      case StackerEffects.SideSlide:
        if (d === 'center') {
          this.renderer.setStyle(item, 'transform', 'scale(1)');
          this.renderer.setStyle(item, 'opacity', 1);
          this.renderer.setStyle(item, 'z-index', 99);
          this.renderer.setStyle(item, 'left', 0);
        } else {
          this.renderer.setStyle(item, 'transform', `scale(${1 - index * 0.35})`);
          this.renderer.setStyle(item, 'left', `${d === 'left' ? -index * 100 : index * 100}px`);
          this.renderer.setStyle(item, 'opacity', 0);
        }
        break;

      case StackerEffects.SideGrid:
        this.renderer.setStyle(item, 'z-index', index === this.selectedIndex ? 99 : 0);
        this.renderer.setStyle(item, 'width', '100%');
        this.renderer.setStyle(item, 'height', '100%');
        this.renderer.setStyle(item, 'left', 0);
        this.renderer.setStyle(item, 'top', 0);
        break;

      case StackerEffects.PeekaBoo:
        if (this.selectedIndex === index) {
          this.renderer.setStyle(item, 'transform', 'scale(1)');
          this.renderer.setStyle(item, 'transform-origin', 'bottom center');
          this.renderer.setStyle(item, 'z-index', 99);
        } else {
          this.renderer.setStyle(item, 'transform', 'scale(0.1)');
          this.renderer.setStyle(item, 'top', 0);
          this.renderer.setStyle(item, 'z-index', 99 - index);
          this.renderer.removeStyle(item, 'transform-origin');
        }
        break;

      case StackerEffects.Queue:
        this.renderer.setStyle(item, 'z-index', index === this.selectedIndex ? 99 : 99 - index);
        this.renderer.setStyle(item, 'transform', 'scale(1)');
        this.renderer.setStyle(item, 'top', 0);
        break;

      case StackerEffects.Fan:
        this.renderer.setStyle(item, 'transform-origin', 'top left');
        this.renderer.setStyle(item, 'z-index', index === this.selectedIndex ? 99 : 99 - index);
        this.renderer.setStyle(item, 'transform', 'rotate(0deg)');
        this.renderer.setStyle(item, 'transition', 'transform .3s');
        break;

      case StackerEffects.ElasticSpread:
        this.renderer.setStyle(item, 'z-index', index === this.selectedIndex ? 99 : 99 - index);
        this.renderer.setStyle(item, 'transition', 'all .3s');
        this.renderer.setStyle(item, 'top', 0);
        break;

      case StackerEffects.VerticalSpread:
        this.renderer.setStyle(item, 'z-index', index === this.selectedIndex ? 99 : 99 - index);
        this.renderer.setStyle(item, 'transition-delay', '0s');
        this.renderer.setStyle(item, 'top', 0);
        break;

      case StackerEffects.Leaflet:
        this.renderer.setStyle(item, 'z-index', index === this.selectedIndex ? 99 : 99 - index);
        this.renderer.setStyle(item, 'transform', `rotateX(0deg)`);
        this.renderer.setStyle(item, 'transition-delay', '0s');
        break;

      case StackerEffects.Coverflow:
        this.renderer.setStyle(item, 'z-index', index === this.selectedIndex ? 99 : 99 - index);
        this.renderer.setStyle(item, 'transform', 'rotateY(0deg) scale(1)');
        this.renderer.setStyle(item, 'left', 0);
        break;
    }
  }

  handleCentralizedEffect(activate: boolean = false) {
    const center = Math.floor(this.elements.length / 2);
    for (let i = 1; i <= center; i++) {
      let pos = this.selectedIndex - i;
      if (pos < 0) pos = this.elements.length + pos;
      const item = this.elements[pos];
      item.position = center - i;
      if (activate)
        this.setActiveStyle(item.element, i, 'left');
      else
        this.setDeactiveStyle(item.element, i, 'left');
    }
    for (let i = 1; i < this.elements.length - center; i++) {
      let pos = this.selectedIndex + i;
      if (pos >= this.elements.length) pos = pos - this.elements.length;
      const item = this.elements[pos];
      item.position = center + i;
      if (activate)
        this.setActiveStyle(item.element, i, 'right');
      else
        this.setDeactiveStyle(item.element, i, 'right');
    }
    const selectedItem = this.elements[this.selectedIndex];
    selectedItem.position = center;
    this.setDeactiveStyle(selectedItem.element, this.selectedIndex, 'center');
    if (activate) {
      this.setActiveStyle(selectedItem.element, null, 'center');
    }
  }
}
