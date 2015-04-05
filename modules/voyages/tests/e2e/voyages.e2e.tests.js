'use strict';

describe('Voyages E2E Tests:', function() {
	describe('Test Voyages page', function() {
		it('Should not include new Voyages', function() {
			browser.get('http://localhost:3000/#!/voyages');
			expect(element.all(by.repeater('voyage in voyages')).count()).toEqual(0);
		});
	});
});
