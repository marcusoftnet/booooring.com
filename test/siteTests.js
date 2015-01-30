var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('The site for humans', function(){
  describe('has a home page that', function(){

    beforeEach(function (done) {
      testHelpers.removeAllDocs(done);
    });

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
            req.text.should.containEql("Boooring");
            req.text.should.containEql("Slave choir");
            req.text.should.containEql("Slow clapping");
            req.text.should.containEql("So close");
          })
          .end(done);
      })();
    });
  });

  it('has a disclaimer page', function(done){
    request
    .get('/disclaimer')
    .expect(200, done);
  });
});