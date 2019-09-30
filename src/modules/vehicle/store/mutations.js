import {
  SET_VEHICLE_DETAILS,
  SET_DRIVER_DETAILS
  // SET_FUEL_HISTORY,
  // SET_MAINTENANCE_HISTORY
} from './mutations.type'
export default {
  [SET_DRIVER_DETAILS](state, driver_details) {
    state.driver_details = driver_details
  },
  [SET_VEHICLE_DETAILS](state, vehicle_details) {
    state.vehicle_details = vehicle_details
  }
  // [SET_FUEL_HISTORY](state, fuel_history) {
  //   state.fuel_history = fuel_history
  // },
  // [SET_MAINTENANCE_HISTORY](state, maintenance_history) {
  //   state.maintenance_history = maintenance_history
  // }
}
