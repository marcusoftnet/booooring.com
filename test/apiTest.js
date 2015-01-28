var app = require('../app');
var request = require('supertest').agent(app.listen());

describe('API for streaming', function(){
  it('return existing files', function(done){
    request
    .get('/api/sound/boooring')
    .expect(200, done);
  });

  it('fails for non existing files', function(done){
    request
    .get('/api/sound/_____')
    .expect(404, done);
  });
});