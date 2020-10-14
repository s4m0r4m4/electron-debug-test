/******************************************************************************
* File: environment.prod.ts
* Author: Sam Schreiner
* Date: March 19 2020
******************************************************************************/
type IAIMAppEnvironment = any;

/******************************************************************************
* Class: AngularAppConfig
******************************************************************************/
export const AngularAppConfig: IAIMAppEnvironment = {
    BuildType: 'test',
    IsProduction: true
};
