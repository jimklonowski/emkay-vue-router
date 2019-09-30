// MUTATIONS ARE SYNCHRONOUS TRANSACTIONS!
// The only way to actually change state in a Vuex store is by committing a mutation.
// https://vuex.vuejs.org/guide/mutations.html#mutations-must-be-synchronous
export const PURGE_AUTH = 'logOut'
export const SET_AUTH = 'setUser'
export const SET_ERROR = 'setError'
//export const RESET_STATE = 'resetModuleState'
