var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('API for web pages', function(){
  describe('streams sounds', function(){
    it('return existing files', function(done){
      request
      .get('/api/sound/' + testHelpers.testSoundName)
      .expect(200, done);
    });

    it('fails for non existing files', function(done){
      request
      .get('/api/sound/_____')
      .expect(404, done);
    });
  });

  describe('counts the number of plays for a sound', function () {
    beforeEach(function (done) {
      testHelpers.removeAllDocs(done);
    });

    it('sets the number of plays to 1 for a sound that noone has played', function (done) {
      co(function *() {
        testHelpers.seedDb();

        request
          .post("/api/played/" + testHelpers.testSoundName)
          .expect(200)
          .end(function (){
            co(function *() {
              var sound = yield testHelpers.soundCollection.findOne({name :  testHelpers.testSoundName});
              sound.noOfPlays.should.equal(1);
            })(done);
          });
      })();
    });
    it('increments the number of plays with 1 for sounds that is played', function (done) {
    	co(function *() {
	      testHelpers.seedDb();

	    	yield testHelpers.soundCollection.insert({ name: 'booooring', noOfPlays : 12 })

        request
          .post("/api/played/" + testHelpers.testSoundName)
          .expect(200)
          .end(function (){
            co(function *() {
              var sound = yield testHelpers.soundCollection.findOne({name : testHelpers.testSoundName});
              sound.noOfPlays.should.equal(13);
            })(done);
          });
      })();
    });
  })
});