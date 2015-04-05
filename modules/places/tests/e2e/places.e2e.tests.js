'use strict';

describe('Places E2E Tests:', function() {
	describe('Test Places page', function() {
		it('Should not include new Places', function() {
			browser.get('http://localhost:3000/#!/places');
			expect(element.all(by.repeater('place in places')).count()).toEqual(0);
		});
	});
});
