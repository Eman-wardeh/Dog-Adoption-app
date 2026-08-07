require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

before(async () => {
  await mongoose.connect(process.env.DB_URI);
});

after(async () => {
  await mongoose.connection.close();
});

describe('API Tests', () => {
  it('Should create a new user', async () => {
    const res = await chai.request(app).post('/signup').send({
      name: 'Test User',
      email: 'testuser3@example.com',
      password: 'password123'
    });

    expect(res).to.have.status(201);
     // 2. check response is JSON
    expect(res).to.be.json;

    // 3. check body structure
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('user');

    // 4. check nested fields
    expect(res.body.user).to.have.property('_id');
    expect(res.body.user).to.have.property('email');
    expect(res.body.user.email).to.include('@');
  });
  it('Should render an html page', async()=>{
    const res = await chai.request(app).get('/signup')
    .send();
    expect(res).to.have.status(200);
    expect(res).to.be.html;
    expect(res.text).to.include('<form>');
   
  })
});