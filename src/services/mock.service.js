import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let mock = new MockAdapter(axios)

const MockService = {
  init() {
    // EM102,JCK,123: Login Success, isAdmin=false
    mock
      .onPost('/users/login', { user: { account: 'EM102', username: 'JCK', password: '123' } })
      .reply(200, { user: { account: 'EM102', username: 'JCK', isAdmin: false, token: 'JCK12345' } })

    // EM102,admin,admin: Login Success, isAdmin=true
    mock
      .onPost('/users/login', { user: { account: 'EM102', username: 'admin', password: 'admin' } })
      .reply(200, { user: { account: 'EM102', username: 'admin', isAdmin: true, token: 'ADMIN12345' } })

    mock
      .onPost('/users/login', { user: { account: 'EM102', username: 'bad', password: 'bad' } })
      .reply(500, { user: { isAdmin: false }, errors: ['Invalid Credentials!'], success: false })

    //mock.onGet('/user/').reply(200, { user: { account: 'EM102', username: 'JCK', token: '1234567890' } })
  }
}

export default MockService
