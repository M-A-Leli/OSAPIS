import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OSAPIS } from './osapis';

describe('OSAPIS', () => {
	let component: OSAPIS;
	let fixture: ComponentFixture<OSAPIS>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OSAPIS]
		})
			.compileComponents();

		fixture = TestBed.createComponent(OSAPIS);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
