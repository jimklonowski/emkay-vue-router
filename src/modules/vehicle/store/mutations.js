import {
  SET_VEHICLE_DETAILS,
  SET_DRIVER_DETAILS,
  SET_FUEL_HISTORY,
  SET_MAINTENANCE_HISTORY,
  SET_INVOICE_HISTORY,
  SET_LICENSING_HISTORY,
  SET_ACCIDENT_HISTORY,
  SET_RENTAL_HISTORY,
  SET_TOLL_HISTORY,
  SET_VIOLATION_HISTORY,
  SET_ODOMETER_HISTORY,
  SET_DRIVER_HISTORY,
  SET_VEHICLE_NOTES
} from './mutations.type'
export default {
  [SET_DRIVER_DETAILS](state, driver_details) {
    state.driver_details = driver_details
  },
  [SET_VEHICLE_DETAILS](state, vehicle_details) {
    state.vehicle_details = vehicle_details
  },
  [SET_FUEL_HISTORY](state, fuel_history) {
    state.fuel_history = fuel_history
  },
  [SET_MAINTENANCE_HISTORY](state, maintenance_history) {
    state.maintenance_history = maintenance_history
  },
  [SET_INVOICE_HISTORY](state, invoice_history) {
    state.invoice_history = invoice_history
  },
  [SET_LICENSING_HISTORY](state, licensing_history) {
    state.licensing_history = licensing_history
  },
  [SET_ACCIDENT_HISTORY](state, accident_history) {
    state.accident_history = accident_history
  },
  [SET_RENTAL_HISTORY](state, rental_history) {
    state.rental_history = rental_history
  },
  [SET_TOLL_HISTORY](state, toll_history) {
    state.toll_history = toll_history
  },
  [SET_VIOLATION_HISTORY](state, violation_history) {
    state.violation_history = violation_history
  },
  [SET_ODOMETER_HISTORY](state, odometer_history) {
    state.odometer_history = odometer_history
  },
  [SET_DRIVER_HISTORY](state, driver_history) {
    state.driver_history = driver_history
  },
  [SET_VEHICLE_NOTES](state, vehicle_notes) {
    state.vehicle_notes = vehicle_notes
  }
}
