'use strict';

describe('Points of interests E2E Tests:', function() {
	describe('Test Points of interests page', function() {
		it('Should not include new Points of interests', function() {
			browser.get('http://localhost:3000/#!/points-of-interests');
			expect(element.all(by.repeater('pointsOfInterest in pointsOfInterests')).count()).toEqual(0);
		});
	});
});
