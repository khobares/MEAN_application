var expect = require('chai').expect;
var server = require('./testServer.js');
var request = require('request');

describe("Test Hotel API", function () {
  before(function () {

  });

  after(function () {

  });

  it('Test GET all Hotels', function (done) {
    request.get('http://localhost:3000/api/hotels', function (err, res, body){
      if(err){
        console.log(err);
      }
      else{
        expect(res.statusCode).to.equal(200);
        done();
      }
    });
  });

  it('Test GET Hotel by ID', function(done){
    request.get('http://localhost:3000/api/hotels/58d42f001384d35d8c201bbc', function(err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });


  it('Test GET Hotel by ID (Invalid ID)', function(done){
    request.get('http://localhost:3000/api/hotels/58d42f001384d35d8c201bbca', function(err, res, body){
        expect(res.statusCode).to.equal(500);
        done();
    });
  });

  it('Test GET Hotel by ID (ID doesnot exist)', function(done){
    request.get('http://localhost:3000/api/hotels/58d42f001384d35d8c202bbc', function(err, res, body){
        expect(res.statusCode).to.equal(404);
        done();
    });
  });
});
