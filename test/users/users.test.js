const chai = require('chai');
const request = require('chai-http');

chai.should();
chai.use(request);

// Test users route
describe('POST /users/login:', () => {
  let server;

  before(async () => {
    console.log('Initialize Server Instance!');
    server = require('../../app').server;
    await chai.request.agent(server);
  });

  // Best Case
  it('Case Correct Username and Password', (done) => {
    const genericUser = {
      username: 'an@gmail.com',
      password: '123456',
    };
    chai
      .request(server)
      .post('/users/login')
      .send(genericUser)
      .then((response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        console.log('Pass body type!');
        response.body.should.have.property('isAuthenticated').eq(true);
        console.log('Pass field isAuthenticated!');
        response.body.should.have
          .property('user')
          .contains({ email: genericUser.username })
          .contains({ role: 1 })
          .contains({ id: '6097fbd52a6b1433b2ad0a8c' });
        console.log('Pass field user!');
        done();
      })
      .catch(done);
  });
  // Should have timeout because takes time to connect to cloud database!

  // Case wrong username or password
  it('Case Wrong Username or Password', (done) => {
    const genericUser = {
      username: 'an@gmail.com',
      password: '12345',
    };
    chai
      .request(server)
      .post('/users/login')
      .send(genericUser)
      .then((response) => {
        response.should.have.status(400);
        console.log('Pass status code!');
        response.body.should.be.a('object');
        console.log('Pass body type!');
        response.body.should.have.property('message').to.deep.eq({
          msgBody: 'Password/Username not match!',
          msgError: true,
        });
        console.log('Pass object equal!');
        done();
      })
      .catch(done);
  });
});
