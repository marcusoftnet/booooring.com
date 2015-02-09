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


	describe('lists the total number of songs', function () {
		var comparePrefix = 'id="totalNoSounds">';

		it('0 sounds in the database gives zero songs....duh!', function (done) {
			request
				.get('/')
				.expect(function (req) {
					req.text.should.containEql(comparePrefix +  '0');
				})
				.end(done);
		});

		it('1 sound in the database gives 1 in total... yaaaaawn...', function (done) {
			testHelpers.insertTestSound({ name: 'testSound'});

			request
				.get('/')
				.expect(function (req) {
					req.text.should.containEql(comparePrefix +  '1');
				})
				.end(done);
		});

		it('and so on and so ... yaaaaawn ... forth... 4 songs for example... 4 songs in total on the page', function (done) {
			testHelpers.insertTestSound({ name: 'testSound1'});
			testHelpers.insertTestSound({ name: 'testSound2'});
			testHelpers.insertTestSound({ name: 'testSound3'});
			testHelpers.insertTestSound({ name: 'testSound4'});

			request
				.get('/')
				.expect(function (req) {
					req.text.should.containEql(comparePrefix +  '4');
				})
				.end(done);
		});
	});

	describe('lists the total number of plays', function () {
		var comparePrefix = 'id="totalNoPlays">';

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