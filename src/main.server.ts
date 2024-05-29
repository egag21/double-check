import { ApplicationRef, enableProdMode } from '@angular/core';
import { platformServer, renderModule, PlatformState } from '@angular/platform-server';
import { NgModuleRef } from '@angular/core';
import { AppServerModule } from './app/app.server.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export default function bootstrap(): Promise<ApplicationRef> {
  return platformServer().bootstrapModule(AppServerModule).then((moduleRef: NgModuleRef<AppServerModule>) => {
    return moduleRef.injector.get(ApplicationRef);
  });
}
