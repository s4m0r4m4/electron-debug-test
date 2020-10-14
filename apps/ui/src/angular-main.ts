import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AngularAppConfig } from './environments/environment.dev';

if (AngularAppConfig.IsProduction) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => {
        // tslint:disable-next-line: no-console
        return console.error(err);
    });
