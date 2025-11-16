import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes),
		provideHttpClient(),

		// Translation
		provideTranslateService({
			fallbackLang: 'en',
			useDefaultLang: true,

			loader: provideTranslateHttpLoader({
				prefix: '/i18n/',  // public/i18n/en.json
				suffix: '.json',
				// Optional:
				// enforceLoading: true,
				// useHttpBackend: true,
			})
		})
	]
};
