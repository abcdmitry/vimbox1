import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {VtSelect} from "./vt-select.component";
import {AnswersStore} from "./select-store.service";
import {AnswersStatisticsComponent} from "./answers-statistics.component";

@NgModule({
  declarations: [
    AppComponent,
    VtSelect,
    AnswersStatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AnswersStore], // Top level injection of SelectStore service
  bootstrap: [AppComponent]
})
export class AppModule { }
