import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-header',
	imports: [CommonModule],
	templateUrl: './header.html',
	styleUrls: ['./header.css']
})
export class Header {
	@Input() currentLang: string = 'en';
	@Input() supportedLangs: string[] = [];
	@Output() langChange = new EventEmitter<string>();

	logoUrl: string | null = 'images/Logo.png';
	name: string = 'OSAPIS';

	onLangSelect(event: Event) {
		const lang = (event.target as HTMLSelectElement).value;
		this.langChange.emit(lang);
	}
}
