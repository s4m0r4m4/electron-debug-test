import { HttpClient } from '@angular/common/http';
/******************************************************************************
* File: app.component.ts
* Author: Sam Schreiner
* Date: July 08 2020
******************************************************************************/
import { Component } from '@angular/core';

/******************************************************************************
* Component: AppComponent
******************************************************************************/
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    /******************************************************************************
    * Constructor
    ******************************************************************************/
    constructor(private http: HttpClient) {

        console.log('I have been constructed!');

    }

}
