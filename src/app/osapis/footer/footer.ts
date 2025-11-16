import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-footer',
	imports: [CommonModule, TranslateModule],
	templateUrl: './footer.html',
	styleUrls: ['./footer.css']
})
export class Footer {
	currentYear = new Date().getFullYear();
	portfolioLink: string = 'https://m-a-leli.com';
}
