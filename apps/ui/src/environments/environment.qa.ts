/******************************************************************************
* File: environment.test.ts
* Author: Sam Schreiner
* Date: July 23 2020
* Note: Test environment
******************************************************************************/
type IAIMAppEnvironment = any;

/******************************************************************************
* Class: AngularAppConfig
******************************************************************************/
export const AngularAppConfig: IAIMAppEnvironment = {
    BuildType: 'test',
    IsProduction: true,  // To make this as similar to production as possible
};
