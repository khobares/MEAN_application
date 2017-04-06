var expect = require('chai').expect;
var server = require('./testServer.js');
var request = require('request');

describe("Test Reviews API", function () {
  before(function () {

  });

  after(function () {

  });

  it('Test GET all Reviews for a Hotel', function(done){
    request.get('http://localhost:3000/api/hotels/58d42efe3c02fec97ca93c9c/reviews', function(err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
    });
  });
  it('Test GET all Reviews for a Hotel (invalid HotelID)', function(done){
    request.get('http://localhost:3000/api/hotels/58d42f001384d35d8c201bbca/reviews', function(err, res, body){
        expect(res.statusCode).to.equal(500);
        done();
    });
  });

  it('Test GET all Reviews for a Hotel (hotelID doesnot exist)', function(done){
    request.get('http://localhost:3000/api/hotels/58d42efe3c02fec97ca93c2c/reviews', function(err, res, body){
        expect(res.statusCode).to.equal(400);
        done();
    });
  });

  it('Test GET all Reviews for a Hotel By HotelID & ReviewID', function(done){
    request.get('http://localhost:3000/api/hotels/58d42efe3c02fec97ca93c9d/reviews/58d82fbe6dbc3a954d734acb', function(err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
    });
  });

  it('Test GET all Reviews for a Hotel By ID (invalid HotelID)', function(done){
    request.get('http://localhost:3000/api/hotels/58d42efe3c02fec97ca93c9zz/reviews/58d82b3262f787494ccc7630', function(err, res, body){
        expect(res.statusCode).to.equal(500);
        done();
    });
  });
  it('Test GET all Reviews for a Hotel By ID (hotelID doesnot exist)', function(done){
    request.get('http://localhost:3000/api/hotels/58d42efe3c02fec97ca93c2c/reviews/58d82b3262f787494ccc7630', function(err, res, body){
        expect(res.statusCode).to.equal(404);
        done();
    });
  });
  it('Test GET all Reviews for a Hotel By ID (Review doesnot exist)', function(done){
    request.get('http://localhost:3000/api/hotels/58d42f001384d35d8c221bbc/reviews/58d82b3262f787494ccc76301', function(err, res, body){
        expect(res.statusCode).to.equal(404);
        done();
    });
  });
});
