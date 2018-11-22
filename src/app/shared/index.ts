import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import 'hammerjs';

// Pipes
import { KeysPipe } from './pipes/keys.pipe';
import { HumanizePipe } from '../core/pipes/humanize.pipe';

// components
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import {inlineTranslatorComp} from './../_custom/inlineTranslatorComp';
// imports
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './components/notification/notification.component';
import {InlineEditorModule} from 'ng2-inline-editor';

import { flagSelectComp } from './components/flagSelect/flagSelect.comp'
import { breadCrumbzComp } from './../comps/breadCrumbz/breadCrumbzComp'
import { RouterModule } from '@angular/router';
import { NguCarouselModule } from '@ngu/carousel';


@NgModule({
  declarations: [
    // components
    LoadingIndicatorComponent,
    NotificationComponent,
    inlineTranslatorComp,
    flagSelectComp,
    breadCrumbzComp,
    // pipes
    KeysPipe,
    HumanizePipe
  ],
  exports: [
    // components
    LoadingIndicatorComponent,
    NotificationComponent,
    inlineTranslatorComp,
    flagSelectComp,
    breadCrumbzComp,
    // modules
    CommonModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    // pipes
    KeysPipe,
    HumanizePipe,
    NguCarouselModule
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    InlineEditorModule,
    RouterModule
  ]
})
export class SharedModule {}
