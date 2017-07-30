import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdListModule, MdInputModule, MdSidenavModule, MdToolbarModule, MdTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {KeepHtmlPipe} from '../pipes/keep-html.pipe';

import {ClipboardDirective} from './clipboard.directive';
import {ClipboardService} from './clipboard.service';

import {ComponentsComponent} from './components.component';
import {ComponentsHomeComponent} from './components-home/components-home.component';
import {ComponentsListComponent} from './components-list/components-list.component';
import {ComponentsDetailComponent} from './components-detail/components-detail.component';

import {ComponentsService} from './components.service';

import {ComponentsRoutingModule} from './components-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MdListModule,
        MdInputModule,
        MdSidenavModule,
        MdToolbarModule,
        MdTabsModule,
        BrowserAnimationsModule,
        ComponentsRoutingModule
    ],
    declarations: [
        KeepHtmlPipe,
        ComponentsComponent,
        ComponentsHomeComponent,
        ComponentsListComponent,
        ComponentsDetailComponent,
        ClipboardDirective
    ],
    exports: [
        ComponentsComponent,
        ClipboardDirective
    ],
    providers: [
        ComponentsService,
        ClipboardService
    ]
})
export class ComponentsModule {
}
