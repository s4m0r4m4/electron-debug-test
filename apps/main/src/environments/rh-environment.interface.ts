/******************************************************************************
* File: rh-environment.interface.ts
* Author: Sam Schreiner
* Date: August 10 2020
******************************************************************************/

/******************************************************************************
* Interface: IRHEnvironment
******************************************************************************/
export interface IRHEnvironment {

    IsProduction: boolean;
    RendererAppRelativePath: string;
    RendererAppPort: number;

}
