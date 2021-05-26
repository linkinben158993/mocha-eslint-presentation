const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

// Test API change username
describe('PATCH /users/change-name', function () {
  let server;

  before(async function () {
    console.log('Initialize server instance...');
    server = require('../../app').server;

    await chai.request.agent(server);
  });

  // Best case
  it('Case correct newName and email and ret', function (done) {
    const data = {
      newName: 'Duc Cao',
      email: 'an@gmail.com',
    };

    chai
      .request(server)
      .patch('/users/change-name')
      .send(data)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        // expect(res.body).be.a('object');
        console.log('Pass body type!');

        res.body.should.have.property('newName');
        // expect(res.body).have.property('new_name');
        console.log('Pass newName property');

        res.body.should.have.property('email');
        // expect(res.body).have.property('email');
        console.log('Pass email property');

        res.body.should.have.property('ret');
        console.log('Pass ret property');

        done();
      })
      .catch(done);
  });
});
