import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// delay all requests by 2sec
let mock = new MockAdapter(axios, { delayResponse: 2000 })

const MockService = {
  init() {
    // EM102,JCK,123: Login Success, isAdmin=false
    mock
      .onPost('/users/login', {
        user: { account: 'EM102', username: 'JCK', password: '123' }
      })
      .reply(200, {
        user: {
          account: 'EM102',
          username: 'JCK',
          isAdmin: false,
          token: 'JCK12345'
        }
      })

    // EM102,admin,admin: Login Success, isAdmin=true
    mock
      .onPost('/users/login', {
        user: { account: 'EM102', username: 'admin', password: 'admin' }
      })
      .reply(200, {
        user: {
          account: 'EM102',
          username: 'admin',
          isAdmin: true,
          token: 'ADMIN12345'
        }
      })

    // EM102,jklonowski@emkay.com: return user
    mock
      .onPost('/users/login-help', {
        user: { account: 'EM102', email: 'jklonowski@emkay.com' }
      })
      .reply(200, {
        user: {
          account: 'EM102',
          username: 'JCK',
          password: '123',
          isAdmin: false,
          token: 'JCK12345'
        }
      })

    // EM102,bad,bad: LoginFailure
    mock
      .onPost('/users/login', {
        user: { account: 'EM102', username: 'bad', password: 'bad' }
      })
      .reply(500, {
        user: { isAdmin: false },
        errors: ['Invalid Credentials!'],
        success: false
      })

    mock.onPost('/test/error').reply(400, { success: false })
    mock.onPost('/test/ok').reply(200, { success: true })
    mock.onPost('/test/unauthorized').reply(401, { success: false })
    //mock.onGet('/user/').reply(200, { user: { account: 'EM102', username: 'JCK', token: '1234567890' } })
  }
}

export default MockService
