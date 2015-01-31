var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('The site for humans', function(){

  beforeEach(function (done) {
    testHelpers.removeAllDocs(done);
  });

  describe('has a disclaimer page that', function () {

    it('shows up without problems', function(done){
      request
      .get('/disclaimer')
      .expect(200, done);
    });
  });

  describe('has a home page that', function(){

    it('shows up nicely without errors', function(done){
      request
      .get('/')
      .expect(200, done);
    });

    it('list the sounds in the database', function (done) {
      co(function *() {
        testHelpers.seedDb();

        request
          .get('/')
          .expect(function (req) {
            req.text.should.containEql("Booooring");
            req.text.should.containEql("Slave choir");
            req.text.should.containEql("Slow clapping");
            req.text.should.containEql("So close");
          })
          .end(done);
      })();
    });

    it('the list of sounds links to the sound page', function (done) {
      co(function *() {
        testHelpers.seedDb();

        request
          .get('/')
          .expect(function (req) {
            req.text.should.containEql("href='/sound/booooring'");
          })
          .end(done);
      })();
    });
  });

  describe('has a page for one sound that', function () {
    beforeEach(function (done) {
      co(function *() {
        testHelpers.seedDb();
      })(done);
    });

    it('shows up nicely for existing sounds', function (done) {
      request
        .get('/sound/booooring')
        .expect(function (req) {
          req.text.should.containEql("booooring");
        })
        .expect(200)
        .end(done);
    });

    it('accepts an autoplay parameter to play the sound directly', function (done) {
      request
        .get('/sound/booooring?autoplay=true')
        .expect(function (req) {
          req.text.should.containEql("playSound('booooring');");
        })
        .expect(200)
        .end(done);
    });
  });
});