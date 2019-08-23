import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeAfterContainerComponent } from './before-after-container.component';

describe('BeforeAfterContainerComponent', () => {
  let component: BeforeAfterContainerComponent;
  let fixture: ComponentFixture<BeforeAfterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeAfterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeAfterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
