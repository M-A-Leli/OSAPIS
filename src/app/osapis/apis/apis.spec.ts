import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APIs } from './apis';

describe('APIs', () => {
	let component: APIs;
	let fixture: ComponentFixture<APIs>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [APIs]
		})
			.compileComponents();

		fixture = TestBed.createComponent(APIs);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
