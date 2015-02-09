var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('The site for humans', function(){

	beforeEach(function (done) {
	testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
	testHelpers.removeAllDocs(done);
	});

	var comparePrefix = 'id="totalNoPlays">';

	describe('lists the total number of plays', function () {
		it('0 sounds in the database gives zero plays', function (done) {
			request
				.get('/')
				.expect(function (req) {
					req.text.should.containEql(comparePrefix +  '0');
				})
				.end(done);
		});
		it('with 1 sound played only once the total number of plays is 1, of course', function (done) {
			testHelpers.insertTestSound({ name: 'testSound', noOfPlays:1});

			request
				.get('/')
				.expect(function (req) {
					req.text.should.containEql(comparePrefix +  '1');
				})
				.end(done);
		});
		it('with 2 sounds played 2 twice each the total number of plays is 4', function (done) {
			testHelpers.insertTestSound({ name: 'testSound', noOfPlays:2});
			testHelpers.insertTestSound({ name: 'testSound2', noOfPlays:2});

			request
				.get('/')
				.expect(function (req) {
					req.text.should.containEql(comparePrefix +  '4');
				})
				.end(done);
		});
		it('and consequenly with 1 sounds played 400 times the total number of plays is 400', function (done) {
			testHelpers.insertTestSound({ name: 'testSound', noOfPlays:400});

			request
				.get('/')
				.expect(function (req) {
					req.text.should.containEql(comparePrefix +  '400');
				})
				.end(done);
		});
	});
});