import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/* import { HttpClientModule } from '@angular/common/http';

const httpClient = new HttpClientModule();
httpClient */


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
