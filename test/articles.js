process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let article = require('../models/articlesModel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('article', () => {
  beforeEach((done) => {
    article.remove({}, (err) => {
      done();
    });
  });
  describe('/GET article', () => {
    it('it should GET all the article', (done) => {
      chai
        .request('http://localhost:5000')
        .get('/api/articles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.articles.should.be.a('array');
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe('/POST articles', () => {
    it('it should not POST a articles without authorized id', (done) => {
      let article = {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        body: 'this is body of the articles',
        authorId: 'unknown',
      };
      chai
        .request('http://localhost:5000')
        .post('/api/articles/add')
        .send(article)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id article', () => {
    it('it should GET a article by the given id', (done) => {
      let art = new article({
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        body: 1954,
        authorId: 1170,
      });
      article.save((err, article) => {
        chai
          .request('http://localhost:5000')
          .get('/article/' + article.id)
          .send(art)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('body');
            res.body.should.have.property('authorId');
            res.body.should.have.property('_id').eql(article.id);
            done();
          });
      });
    });
  });
});
