import { Component, OnInit, Input, ElementRef, Renderer2, ViewChildren, AfterViewInit, ContentChildren, QueryList } from '@angular/core';
import { StackerEffects } from './stacker-effects';
import { StackerItemComponent } from './stacker-item.component';

@Component({
  selector: 'stacker',
  templateUrl: './stacker.component.html',
  styleUrls: ['./stacker.component.scss']
})
export class StackerComponent implements OnInit, AfterViewInit {
  StackerEffects = StackerEffects;

  @Input()
  effect = StackerEffects.Fanout;

  @ContentChildren(StackerItemComponent)
  children: QueryList<StackerItemComponent> = new QueryList<any>();

  items: HTMLCollectionOf<any>;
  selectedIndex = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.items = this.elementRef.nativeElement.getElementsByClassName('stacker-item');
    this.setVisibility();
  }

  setVisibility() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items.item(i);
      this.renderer.setStyle(item, 'z-index', this.selectedIndex === i ? '99' : `${90 + i}`);
    }
  }

  active() {
    const selectedItem = this.items.item(this.selectedIndex);
    this.deactiveItem(selectedItem);
    this.renderer.setStyle(selectedItem, 'transform', 'scale(0.9)');
    this.renderer.setStyle(selectedItem, 'box-shadow', '0px 7px 17px 3px #0000006b');

    const items = [];
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items.item(i);
      if (i !== this.selectedIndex)
        items.push(item);
    }
    let li = 0, ri = 0;
    items.forEach((item, index) => {
      if (index < items.length / 2) {
        this.activeItem(items.length / 2 - li, 'left', item);
        li += 1;
      } else {
        this.activeItem(items.length / 2 - ri, 'right', item);
        ri += 1;
      }
    });
  }

  deactive() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items.item(i);
      this.deactiveItem(item);
    }
  }

  activeItem(index: number, direction: 'left' | 'right', item) {
    this.renderer.setStyle(item, 'box-shadow', '0px 7px 17px 3px #0000006b');
    this.renderer.setStyle(item, 'transform', `scale(0.9) rotate(${direction === 'left' ? -index * 10 : index * 10}deg)`);
    this.renderer.setStyle(item, 'left', `${direction === 'left' ? -index * 100 : index * 100}px`);
    this.renderer.setStyle(item, 'top', `${index * 20}px`);
  }

  deactiveItem(item) {
    this.renderer.setStyle(item, 'top', '0');
    this.renderer.setStyle(item, 'left', '0');
    this.renderer.removeStyle(item, 'box-shadow');
    this.renderer.removeStyle(item, 'transform');
  }

  selectItem(i) {
    this.selectedIndex = i;
    this.setVisibility()
    this.active();
  }
}
