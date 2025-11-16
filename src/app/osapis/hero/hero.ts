import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-hero',
	imports: [CommonModule, TranslateModule],
	templateUrl: './hero.html',
	styleUrls: ['./hero.css']
})
export class Hero {

}
