// https://github.com/Flyrell/axios-auth-refresh/blob/master/src/index.js
// import axios from 'axios'
// import JwtService from '../jwt.service'
// import store from '../../store'
// import { REFRESH_TOKEN } from '../../store/actions.type'
// import { LOGOUT } from '../../store/actions.type';
// import router from '../../router'

const defaults = {
  statusCodes: [
    401 // Unauthorized
  ]
}

/**
 * Creates an authentication refresh interceptor that binds to any error response.
 * If the response code is 401, interceptor tries to call the refreshTokenCall which must return a Promise.
 * While refreshTokenCall is running, all new requests are intercepted and waiting for it to resolve.
 * After Promise is resolved/rejected the authentication refresh interceptor is revoked.
 * @param {AxiosInstance|Function} axios - axios instance
 * @param {Function} refreshTokenCall - refresh token call which must return a Promise
 * @param {Object} options - options for the interceptor @see defaultOptions
 * @return {AxiosInstance}
 */
function createAuthRefreshInterceptor(axios, refreshTokenCall, options = {}) {
  const interceptor = axios.interceptors.response.use(
    // return successful response back to the caller
    response => response,
    error => {
      // Reject promise if the error status is not in options.ports or defaults.ports
      const statusCodes = options.hasOwnProperty('statusCodes') && options.statusCodes.length ? options.statusCodes : defaults.statusCodes
      if (!error.response || (error.response.status && statusCodes.indexOf(+error.response.status) === -1)) {
        return Promise.reject(error)
      }

      /**
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes 401 itself.
       */
      axios.interceptors.response.eject(interceptor)

      const refreshCall = refreshTokenCall(error)
      //const refreshCall = () => store.dispatch(REFRESH_TOKEN, JwtService.getRefreshToken())

      // Create interceptor that will bind all the other REQUESTS until refreshTokenCall is resolved
      const requestQueueInterceptor = axios.interceptors.request.use(request => refreshCall.then(() => request))

      // When code is 401, try to refresh the token.
      return refreshCall
        .then(() => {
          axios.interceptors.request.eject(requestQueueInterceptor)
          return axios(error.response.config)
        })
        .catch(error => {
          axios.interceptors.request.eject(requestQueueInterceptor)
          return Promise.reject(error)
        })
        .finally(() => createAuthRefreshInterceptor(axios, refreshTokenCall, options))
    }
  )
  return axios
}

export default createAuthRefreshInterceptor
