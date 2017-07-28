import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ComponentsModule } from './components/components.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ComponentsModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
