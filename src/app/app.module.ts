import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdListModule, MdInputModule} from '@angular/material';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';

import { AppComponent } from './app.component';

import { DataService } from '../shared/data.service';

@NgModule({
  declarations: [
    AppComponent,
    EscapeHtmlPipe
  ],
  imports: [
    BrowserModule,
    MdListModule,
    MdInputModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
