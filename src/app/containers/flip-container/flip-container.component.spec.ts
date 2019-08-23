import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipContainerComponent } from './flip-container.component';

describe('FlipContainerComponent', () => {
  let component: FlipContainerComponent;
  let fixture: ComponentFixture<FlipContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
