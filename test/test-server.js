global.DATABASE_URL = 'mongodb://test:test@ds123400.mlab.com:23400/launch-committees-test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var {User} = require('../users/index.js');
var {SetUp} = require('../set_up_assignment_list/index.js');
var {CleanUp} = require('../clean_up_assignment_list/index.js');

var {runServer} = require('../server.js');
var {closeServer} = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);


describe('index page', function() {
  it('found page', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
});

// test api endpoints for user model

// test api endpoints for clean up assignment list model

describe('Users', function() {
    before(function(done) {
        server.runServer(function() {
            console.log("server running for users tests");
            User.create({firstName: 'Bob', lastName: 'Smith', password: 'password', email: 'bobemail@email.com', newToLaunch: 'true'},
                        {firstName: 'John', lastName: 'Smith', password: 'password', email: 'johnemail@email.com', newToLaunch: 'false'}, function() {
                done();
            });
          });
    });

   describe('Users', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/users/')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('firstName');
                res.body[0].should.have.property('lastName');
                res.body[0].should.have.property('email');
                res.body[0].should.have.property('newToLaunch');
                res.body[0].id.should.be.a('string');
                res.body[0].firstName.should.be.a('string');
                res.body[0].lastName.should.be.a('string');
                res.body[0].email.should.be.a('string');
                res.body[0].newToLaunch.should.be.a('string');
                done();
            });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/users/')
            .send({'firstName': 'Tom', 'lastName': 'Smith', 'password': 'password', 'email': 'tomemail@email.com', 'newToLaunch': 'true'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('email');
                res.body.should.have.property('id');
                res.body.id.should.be.a('string');
                done();
            });
    });

    it('should update an item on PUT but get the ID first', function(done) {
        chai.request(app)
        .get('/users/')
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].id.should.be.a('string');
            done();


            it('should update an item on PUT', function(done) {
              chai.request(app)
              .put('/users/' + res.body[0].id)
              .send({'newToLaunch': 'false'})
              .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                  res.body.should.have.property('firstName');
                  res.body.should.have.property('lastName');
                  res.body.should.have.property('email');
                  res.body.should.have.property('id');
                  res.body.should.have.property('newToLaunch');
                  res.body.item.should.be.a('string');
                  res.body.id.should.be.a('string');
                  res.body.newToLaunch.should.equal("false");
                  done();
                });
              });
        });
    });

    it('should delete an item on DELETE but get the ID first', function(done) {
        chai.request(app)
        .get('/users/')
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].id.should.be.a('string');
            done();


            it('should delete an item on DELETE', function(done) {
                chai.request(app)
                    .delete('/users/' + res.body[0].id)
                    .end(function(err, res){
                        should.equal(err, null);
                        res.should.have.status(404);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.item.should.be.a('string');
                        res.body.id.should.be.a('string');
                        done();
                    });
            });
        });
    });


});

    after(function(done) {
        User.remove(function() {
            done();
        });

    });
});

// test api endpoints for set up assignment list model
describe('Setup List', function() {
    before(function(done) {
        // server.runServer(function() {
            console.log("server running for setup tests");
            SetUp.create({item: 'Set Up Chairs'},
                        {item: 'Make Cookies'},
                        {item: 'Set Out Beverages'}, function() {
                done();
            });
        // });
    });

   describe('Setup List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/set_up_assignment_list')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('item');
                res.body[0].id.should.be.a('string');
                res.body[0].item.should.be.a('string');
                done();
            });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/set_up_assignment_list')
            .send({'item': 'Make Coffee'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('item');
                res.body.should.have.property('id');
                res.body.item.should.be.a('string');
                res.body.id.should.be.a('string');
                // res.body.id.should.equal('3');
                res.body.item.should.equal('Make Coffee');
                done();
            });
    });

    it('should update an item on PUT but get the ID first', function(done) {
        chai.request(app)
        .get('/set_up_assignment_list/')
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].id.should.be.a('string');
            done();


            it('should update an item on PUT', function(done) {
              chai.request(app)
              .put('/set_up_assignment_list/' + res.body[0].id)
              .send({'checked': 'true'})
              .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                  res.body.should.have.property('item');
                  res.body.should.have.property('id');
                  res.body.should.have.property('checked');
                  res.body.item.should.be.a('string');
                  res.body.id.should.be.a('string');
                  res.body.checked.should.equal("true");
                  done();
                });
              })
        });
    });

    it('should delete an item on DELETE but get the ID first', function(done) {
        chai.request(app)
        .get('/set_up_assignment_list/')
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].id.should.be.a('string');
            done();


            it('should delete an item on DELETE', function(done) {
                chai.request(app)
                    .delete('/set_up_assignment_list/' + res.body[0].id)
                    .end(function(err, res){
                        should.equal(err, null);
                        res.should.have.status(404);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('item');
                        res.body.should.have.property('id');
                        res.body.item.should.be.a('string');
                        res.body.id.should.be.a('string');
                        // res.body.item.should.equal('Make Coffee');
                        done();
                    });
            });
        });
    });


});

    after(function(done) {
        SetUp.remove(function() {
            done();
        });

    });
});
// test api endpoints for clean up assignment list model

describe('Cleanup List', function() {
    before(function(done) {
        // server.runServer(function() {
            console.log("server running for cleanup tests");
            CleanUp.create({item: 'Set Up Chairs'},
                        {item: 'Make Cookies'},
                        {item: 'Set Out Beverages'}, function() {
                done();
            });
        //  });
    });

   describe('Cleanup List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/clean_up_assignment_list')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                // res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('item');
                res.body[0].id.should.be.a('string');
                res.body[0].item.should.be.a('string');
                done();
            });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/clean_up_assignment_list/')
            .send({'item': 'Clean Up Chairs'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('item');
                res.body.should.have.property('id');
                res.body.item.should.be.a('string');
                res.body.id.should.be.a('string');
                res.body.item.should.equal('Clean Up Chairs');
                done();
            });
    });

    it('should update an item on PUT but get the ID first', function(done) {
        chai.request(app)
        .get('/clean_up_assignment_list/')
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].id.should.be.a('string');
            done();


            it('should update an item on PUT', function(done) {
              chai.request(app)
              .put('/clean_up_assignment_list/' + res.body[0].id)
              .send({'checked': 'true'})
              .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                  res.body.should.have.property('item');
                  res.body.should.have.property('id');
                  res.body.should.have.property('checked');
                  res.body.item.should.be.a('string');
                  res.body.id.should.be.a('string');
                  res.body.checked.should.equal("true");
                  done();
                });
              })
        });
    });

    it('should delete an item on DELETE but get the ID first', function(done) {
        chai.request(app)
        .get('/clean_up_assignment_list/')
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].id.should.be.a('string');
            done();


            it('should delete an item on DELETE', function(done) {
                chai.request(app)
                    .delete('/clean_up_assignment_list/' + res.body[0].id)
                    .end(function(err, res){
                        should.equal(err, null);
                        res.should.have.status(404);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('item');
                        res.body.should.have.property('id');
                        res.body.item.should.be.a('string');
                        res.body.id.should.be.a('string');
                        // res.body.item.should.equal('Make Coffee');
                        done();
                    });
            });
        });
    });


});

    after(function(done) {
        CleanUp.remove(function() {
            done();
        });

    });
});
