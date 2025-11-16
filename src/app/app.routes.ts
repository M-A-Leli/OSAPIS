import { Routes } from '@angular/router';
import { OSAPIS } from './osapis/osapis';

export const routes: Routes = [
	{ path: '', redirectTo: 'en', pathMatch: 'full' },
	{
		path: ':lang',
		component: OSAPIS,
	},
	{ path: '**', redirectTo: 'en', pathMatch: 'full' }
];
