var app = require('../app');
var request = require('supertest').agent(app.listen());

describe('Site for humans', function(){
  it('has a nice home page', function(done){
    request
    .get('/')
    .expect(200, done);
  });

  it('has a disclaimer page', function(done){
    request
    .get('/disclaimer')
    .expect(200, done);
  });
});