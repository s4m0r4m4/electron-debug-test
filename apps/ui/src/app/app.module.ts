/******************************************************************************
* File: app.module.ts
* Author: Sam Schreiner
* Date: March 19 2020
******************************************************************************/
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'reflect-metadata'; // TODO: needed?
import '../polyfills'; // TODO: needed?
import { AppComponent } from './app.component';

/******************************************************************************
* Module: AppModule
******************************************************************************/
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
