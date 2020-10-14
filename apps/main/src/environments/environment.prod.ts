/******************************************************************************
* File: environment.prod.ts
* Author: Sam Schreiner
* Date: August 10 2020
******************************************************************************/
import { IRHEnvironment } from './rh-environment.interface';

/******************************************************************************
* Const: RHMainEnvironment
******************************************************************************/
export const RHMainEnvironment: IRHEnvironment = {
    // Standard app config
    IsProduction: true,
    RendererAppRelativePath: '../../ui/production', // must match angular.json output path
    RendererAppPort: 4202 // must match debug config
};
