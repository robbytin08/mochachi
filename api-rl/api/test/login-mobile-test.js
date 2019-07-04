const assert = require('chai').expect;

const page = require('../page/login-mobile-page.js');
const data = require('../data/login-mobile-data.json');

const testCase = {
 "positive" : {
    "LoginSuccess" : "User login with correct data",
 },
 "negative" : {
     "LoginWithWrongEmail" : "User login with wrong email"
 },
 "negative2" : {
     "PassEmpty" : "User trying login with empty password"
 }
}

describe(`Login in Android`, () => {

 it(`@post ${testCase.positive.LoginSuccess}`, async() => {
   const response = await page.LoginMobile(data.valid);
    assert(response.status).to.equal(200);
   }),

it (`@post ${testCase.negative.LoginWithWrongEmail}`, async() => {
    const response = await page.LoginMobile(data.EmailWrong);
    assert(response.status).to.equal(403, response.body.Error);
    // assert(response.body.label).to.equal('login_error');
    assert(response.body.message).to.equal('Invalid Username and Password');
    }),

it (`@post ${testCase.negative2.PassEmpty}`, async() => {
    const response = await page.LoginMobile(data.PassRequired);
    assert(response.status).to.equal(400), response.body.Error;
    assert(response.body.result).to.equal(null);
    assert(response.body.message).to.equal('Password is required');
})
}) 