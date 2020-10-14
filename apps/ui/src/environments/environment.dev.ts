/******************************************************************************
* File: environment.dev.ts
* Author: Sam Schreiner
* Date: March 19 2020
* Note: Dev environment
******************************************************************************/
type IAIMAppEnvironment = any;
/******************************************************************************
* Class: AngularAppConfig
******************************************************************************/
export const AngularAppConfig: IAIMAppEnvironment = {
    BuildType: 'test',
    IsProduction:  false
};
