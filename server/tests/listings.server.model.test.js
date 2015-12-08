var should = require('should'), 
    mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model'), 
    config = require('../config/config');

var listing = {
  code: 'LBW',
  name: 'Library West', 
  address: '1545 W University Ave, Gainesville, FL 32603, United States'
};

describe('Listing Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.test.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. Saving to MongoDB is an asynchronous task 
      that may take longer thatn 2000ms. To ensure that the tests do not fail prematurely, 
      we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when code and name provided', function(done){
      new Listing({
        name: listing.name, 
        code: listing.code
      }).save(function(err){
        should.not.exist(err);
        done();
      });
    });

    it('saves properly when all three properties provided', function(done){
      new Listing(listing).save(function(err){
        should.not.exist(err);
        done();
      });
    });

    it('throws an error when name not provided', function(done){
      new Listing({
        code: listing.code
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when code not provided', function(done){
      new Listing({
        name: listing.name
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

  });

  afterEach(function(done) {
    Listing.remove().exec(done);
  });
});