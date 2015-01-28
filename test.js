var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('API for streaming', function(){
  it('should return existing file', function(done){
    request
    .get('/api/sound/boooring')
    .expect(200, done);
  });

  it('returns 404 for non existing file', function(done){
    request
    .get('/api/sound/stupid')
    .expect(404, done);
  });
});