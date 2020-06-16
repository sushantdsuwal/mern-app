process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let user = require('../models/usersModel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('user', () => {
  beforeEach((done) => {
    user.remove({}, (err) => {
      done();
    });
  });

  describe('/Post create user', () => {
    it('it should create a new user', (done) => {
      let user = {
        name: 'superman',
        username: 'superman123',
        email: 'superman123@gmail.com',
        password: 'super123',
        confirmPassword: 'super123',
      };
      chai
        .request('http://localhost:5000')
        .post('/api/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // login user
  describe('/Post login user with invalid crediential', () => {
    it('should be Invalid Username or Password', (done) => {
      let user = {
        username: 'invalidId',
        password: 'invalid',
      };
      chai
        .request('http://localhost:5000')
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.errors.should.be.a('object');
          done();
        });
    });
  });
});
