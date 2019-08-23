import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlipModule } from '../animation/flip/flip.module';
import { PrettyBoxModule } from '../animation/prettybox/pretty.module';
import { SliderModule } from '../animation/slider/slider.module';
import { FlipContainerComponent } from './containers/flip-container/flip-container.component';
import { PrettyboxContainerComponent } from './containers/prettybox-container/prettybox-container.component';
import { BeforeAfterContainerComponent } from './containers/before-after-container/before-after-container.component';

const routes: Routes = [{
  path: 'flips',
  component: FlipContainerComponent
}, {
  path: 'pretty-boxes',
  component: PrettyboxContainerComponent
}, {
  path: 'before-afters',
  component: BeforeAfterContainerComponent
}, {
  path: '',
  component: FlipContainerComponent
}];

@NgModule({
  declarations: [AppComponent, FlipContainerComponent, PrettyboxContainerComponent, BeforeAfterContainerComponent],
  imports: [BrowserModule, FlipModule, PrettyBoxModule, BrowserAnimationsModule, SliderModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
