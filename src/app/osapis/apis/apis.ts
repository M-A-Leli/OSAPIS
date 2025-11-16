import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { API } from '../../models/API.model';

@Component({
	selector: 'app-apis',
	imports: [CommonModule, TranslateModule],
	templateUrl: './apis.html',
	styleUrls: ['./apis.css']
})
export class APIs {
	apis = input<API[]>([]);

	private pageSize = 9;
	currentPage = signal(1);

	get totalPages() {
		return Math.ceil(this.apis().length / this.pageSize);
	}

	paginatedAPIs = computed(() => {
		const list = this.apis();
		const start = (this.currentPage() - 1) * this.pageSize;
		return list.slice(start, start + this.pageSize);
	});

	nextPage() {
		if (this.currentPage() < this.totalPages) this.currentPage.update(p => p + 1);
	}

	prevPage() {
		if (this.currentPage() > 1) this.currentPage.update(p => p - 1);
	}

	goToPage(page: number) {
		if (page >= 1 && page <= this.totalPages) this.currentPage.set(page);
	}
}
