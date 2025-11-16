import { Component, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Header } from './header/header';
import { Hero } from './hero/hero';
import { Nav } from './nav/nav';
import { APIs } from './apis/apis';
import { Footer } from './footer/footer';
import { API } from '../models/API.model';

@Component({
	selector: 'app-osapis',
	imports: [Header, Hero, Nav, APIs, Footer],
	templateUrl: './osapis.html',
	styleUrls: ['./osapis.css']
})
export class OSAPIS {
	currentLang = signal('en');
	supportedLangs = signal<string[]>([]);
	searchQuery = signal('');
	allAPIs = signal<API[]>([]);

	private paramSub?: Subscription;

	filteredAPIs = computed(() => {
		const q = this.searchQuery().toLowerCase();
		const list = this.allAPIs();

		return list.filter(p => {
			// Match text query
			const matchQuery =
				!q ||
				p.NAME?.toLowerCase().includes(q) ||
				p.DESC?.toLowerCase().includes(q) ||
				(p.TECHNOLOGIES || []).join(' ').toLowerCase().includes(q);

			return matchQuery;
		});
	});

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpClient,
		private translate: TranslateService
	) { }

	ngOnInit() {
		this.initLanguages();

		// Listen for :lang param
		this.paramSub = this.route.paramMap.subscribe(params => {
			const routeLang = params.get('lang') || 'en';
			if (routeLang !== this.currentLang()) {
				this.applyLanguage(routeLang);
			}
		});

		// Listen for query params (search param)
		this.route.queryParamMap.subscribe(query => {
			const q = query.get('search') || '';

			if (q) {
				// Set the search query which auto triggers filtering
				this.searchQuery.set(q);

				// Remove query param from the URL
				this.router.navigate(
					['/', this.currentLang()],
					{ replaceUrl: true } // prevents navigation history clutter
				);
			}
		});
	}

	ngOnDestroy() {
		this.paramSub?.unsubscribe();
	}

	// ------------------ LANGUAGE HANDLING ----------------------

	initLanguages() {
		this.http.get<string[]>('/i18n/lang.json').subscribe(langs => {
			this.supportedLangs.set(langs);
			this.translate.addLangs(langs);

			const fallback = 'en';
			const savedLang = localStorage.getItem('lang');
			const routeLang = this.route.snapshot.paramMap.get('lang');

			let langToUse = fallback;

			if (routeLang && langs.includes(routeLang)) langToUse = routeLang;
			else if (savedLang && langs.includes(savedLang)) langToUse = savedLang;

			if (routeLang !== langToUse) {
				this.router.navigate(['/', langToUse]);
			}

			this.applyLanguage(langToUse);
		});
	}

	applyLanguage(lang: string) {
		this.currentLang.set(lang);

		this.translate.use(lang).subscribe(() => {
			localStorage.setItem('lang', lang);
			document.documentElement.lang = lang;

			this.translate.get('APIS.LIST').subscribe((list: API[]) => {
				this.allAPIs.set(list);
			});
		});
	}

	// ------------------ CHILD EVENT HANDLERS -------------------

	onLangChange(lang: string) {
		if (lang !== this.currentLang()) {
			this.applyLanguage(lang);
			this.router.navigate(['/', lang]);
		}
	}

	onFiltersChange(filters: { query: string; }) {
		this.searchQuery.set(filters.query);
	}
}
