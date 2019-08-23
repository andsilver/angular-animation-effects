import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettyboxContainerComponent } from './prettybox-container.component';

describe('PrettyboxContainerComponent', () => {
  let component: PrettyboxContainerComponent;
  let fixture: ComponentFixture<PrettyboxContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrettyboxContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettyboxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
