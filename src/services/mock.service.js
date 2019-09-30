import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// delay all requests by 2sec
let mock = new MockAdapter(axios, { delayResponse: 2500 })

const MockService = {
  init() {
    mock
      //mock login, sets tokens
      .onPost('/auth/login', {
        user: { account: 'EM102', username: 'JCK', password: '123' }
      })
      .reply(200, {
        user: {
          account: 'EM102',
          username: 'JCK',
          isAdmin: false,
          language: 'en',
          access_token: 'ACCESS_TOKEN',
          refresh_token: 'REFRESH_TOKEN'
        }
      })
      .onPost('/auth/token/refresh')
      //.passThrough()
      .reply(200, {
        user: {
          account: 'EM102',
          username: 'JCK',
          isAdmin: false,
          language: 'en',
          access_token: 'ACCESS_TOKEN2',
          refresh_token: 'REFRESH_TOKEN2'
        }
      })
      .onPost('/test/error')
      .reply(400, { success: false })
      // .onPost('/reportAccident')
      // .replyOnce(401)
      // .onPost('/reportAccident')
      // .reply(403, { error: 'oops' })

      // mock fuel history
      .onGet('/vehicle/fuel/123456')
      .reply(200, [
        {
          date: '2019-06-19',
          odometer: '18118',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '22.28',
          unit_cost: '$2.998',
          amount: '$66.80'
        },
        {
          date: '2019-06-13',
          odometer: '17690',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '21.23',
          unit_cost: '$2.798',
          amount: '$59.41'
        },
        {
          date: '2019-06-12',
          odometer: '17541',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'WASH',
          quantity: '1',
          unit_cost: '$19.00',
          amount: '$19.00'
        },
        {
          date: '2019-05-31',
          odometer: '17281',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20.85',
          unit_cost: '$3.095',
          amount: '$64.53'
        },
        {
          date: '2019-05-26',
          odometer: '16897',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.42',
          unit_cost: '$3.259',
          amount: '$72.80'
        },
        {
          date: '2019-05-24',
          odometer: '16612',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'WASH',
          quantity: '1',
          unit_cost: '$9.00',
          amount: '$9.00'
        },
        {
          date: '2019-05-21',
          odometer: '16516',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-05-20',
          odometer: '16512',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20',
          unit_cost: '$3.000',
          amount: '$60.00'
        },
        {
          date: '2019-04-20',
          odometer: '16420',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '14.20',
          unit_cost: '$4.200',
          amount: '$69.69'
        },
        {
          date: '2019-03-19',
          odometer: '16319',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-02-20',
          odometer: '16220',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '15.20',
          unit_cost: '$4.700',
          amount: '$69.42'
        },
        {
          date: '2019-01-19',
          odometer: '16119',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.89',
          unit_cost: '$3.699',
          amount: '$60.21'
        },
        {
          date: '2019-06-19',
          odometer: '18118',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '22.28',
          unit_cost: '$2.998',
          amount: '$66.80'
        },
        {
          date: '2019-06-13',
          odometer: '17690',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '21.23',
          unit_cost: '$2.798',
          amount: '$59.41'
        },
        {
          date: '2019-05-31',
          odometer: '17281',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20.85',
          unit_cost: '$3.095',
          amount: '$64.53'
        },
        {
          date: '2019-05-26',
          odometer: '16897',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.42',
          unit_cost: '$3.259',
          amount: '$72.80'
        },
        {
          date: '2019-05-24',
          odometer: '16612',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'WASH',
          quantity: '1',
          unit_cost: '$9.00',
          amount: '$9.00'
        },
        {
          date: '2019-05-21',
          odometer: '16516',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-05-20',
          odometer: '16512',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20',
          unit_cost: '$3.000',
          amount: '$60.00'
        },
        {
          date: '2019-04-20',
          odometer: '16420',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '14.20',
          unit_cost: '$4.200',
          amount: '$69.69'
        },
        {
          date: '2019-03-19',
          odometer: '16319',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-02-20',
          odometer: '16220',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '15.20',
          unit_cost: '$4.700',
          amount: '$69.42'
        },
        {
          date: '2019-01-19',
          odometer: '16119',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.89',
          unit_cost: '$3.699',
          amount: '$60.21'
        },
        {
          date: '2019-06-19',
          odometer: '18118',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '22.28',
          unit_cost: '$2.998',
          amount: '$66.80'
        },
        {
          date: '2019-06-13',
          odometer: '17690',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '21.23',
          unit_cost: '$2.798',
          amount: '$59.41'
        },
        {
          date: '2019-05-31',
          odometer: '17281',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20.85',
          unit_cost: '$3.095',
          amount: '$64.53'
        },
        {
          date: '2019-05-26',
          odometer: '16897',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.42',
          unit_cost: '$3.259',
          amount: '$72.80'
        },
        {
          date: '2019-05-24',
          odometer: '16612',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'WASH',
          quantity: '1',
          unit_cost: '$9.00',
          amount: '$9.00'
        },
        {
          date: '2019-05-21',
          odometer: '16516',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-05-20',
          odometer: '16512',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20',
          unit_cost: '$3.000',
          amount: '$60.00'
        },
        {
          date: '2019-04-20',
          odometer: '16420',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '14.20',
          unit_cost: '$4.200',
          amount: '$69.69'
        },
        {
          date: '2019-03-19',
          odometer: '16319',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-02-20',
          odometer: '16220',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '15.20',
          unit_cost: '$4.700',
          amount: '$69.42'
        },
        {
          date: '2019-01-19',
          odometer: '16119',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.89',
          unit_cost: '$3.699',
          amount: '$60.21'
        }
      ])
      // mock maintenance history
      .onGet('/vehicle/maintenance/123456')
      .reply(200, [
        {
          date: '2019-08-20',
          odometer: '12345',
          vendor: 'EMKAY Motors',
          in_network: true,
          service: 'Wash & Detail (Fee)',
          amount: '$24.00'
        },
        {
          date: '2019-06-13',
          odometer: '11323',
          vendor: 'EMKAY Motors',
          in_network: false,
          service: 'Wash & Detail (Fee)',
          amount: '$19.00'
        },
        {
          date: '2019-04-01',
          odometer: '10901',
          vendor: 'EMKAY Motors',
          in_network: true,
          service: 'Wash & Detail (Fee)',
          amount: '$750.00'
        }
      ])
      .onAny()
      .passThrough()

    // mock
    //   .onPost('/auth/login', { account: 'EM102', username: 'JCK', password: '123' })
    //   .reply(200, {
    //     user: {
    //       account: 'EM102',
    //       username: 'JCK',
    //       isAdmin: false,
    //       token: 'JCK12345'
    //     }
    //   })
    //   .onAny()
    //   .passThrough()

    // // // EM102,JCK,123: Login Success, isAdmin=false
    // mock
    //   .onPost('/users/login', {
    //     user: { account: 'EM102', username: 'JCK', password: '123' }
    //   })
    //   .reply(200, {
    //     user: {
    //       account: 'EM102',
    //       username: 'JCK',
    //       isAdmin: false,
    //       token: 'JCK12345'
    //     }
    //   })

    // // EM102,admin,admin: Login Success, isAdmin=true
    // mock
    //   .onPost('/users/login', {
    //     user: { account: 'EM102', username: 'admin', password: 'admin' }
    //   })
    //   .reply(200, {
    //     user: {
    //       account: 'EM102',
    //       username: 'admin',
    //       isAdmin: true,
    //       token: 'ADMIN12345'
    //     }
    //   })

    // // EM102,jklonowski@emkay.com: return user
    // mock
    //   .onPost('/users/login-help', {
    //     user: { account: 'EM102', email: 'jklonowski@emkay.com' }
    //   })
    //   .reply(200, {
    //     user: {
    //       account: 'EM102',
    //       username: 'JCK',
    //       password: '123',
    //       isAdmin: false,
    //       token: 'JCK12345'
    //     }
    //   })

    // // EM102,bad,bad: LoginFailure
    // mock
    //   .onPost('/users/login', {
    //     user: { account: 'EM102', username: 'bad', password: 'bad' }
    //   })
    //   .reply(500, {
    //     user: { isAdmin: false },
    //     errors: ['Invalid Credentials!'],
    //     success: false
    //   })

    // mock.onPost('/test/error').reply(400, { success: false })
    // mock.onPost('/test/ok').reply(200, { success: true })
    // mock.onPost('/test/unauthorized').reply(401, { success: false })
    // //mock.onGet('/user/').reply(200, { user: { account: 'EM102', username: 'JCK', token: '1234567890' } })

    // mock.onPost('/services', { command: 'VueAuth' }).passThrough()
    // // Pass through all get requests to server
    // mock.onGet().passThrough()
  }
}

export default MockService
