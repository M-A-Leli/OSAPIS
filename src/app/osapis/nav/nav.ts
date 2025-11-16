import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-nav',
	imports: [CommonModule, FormsModule, TranslateModule],
	templateUrl: './nav.html',
	styleUrls: ['./nav.css']
})
export class Nav {
	@Input() queryValue = '';   // receives value from URL
	@Output() filters = new EventEmitter<{ query: string }>();

	query = '';

	ngOnChanges(changes: SimpleChanges) {
		if (changes['queryValue']) {
			this.query = this.queryValue ?? '';
			this.update(); // auto emit filter
		}
	}

	update() {
		this.filters.emit({
			query: this.query.trim()
		});
	}
}
