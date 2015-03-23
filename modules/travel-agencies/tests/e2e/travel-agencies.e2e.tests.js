'use strict';

describe('Travel agencies E2E Tests:', function() {
	describe('Test Travel agencies page', function() {
		it('Should not include new Travel agencies', function() {
			browser.get('http://localhost:3000/#!/travel-agencies');
			expect(element.all(by.repeater('travelAgency in travelAgencies')).count()).toEqual(0);
		});
	});
});
