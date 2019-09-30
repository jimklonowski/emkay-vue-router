import {
  FETCH_DRIVER_DETAILS,
  FETCH_VEHICLE_DETAILS,
  FETCH_FUEL_HISTORY,
  FETCH_MAINTENANCE_HISTORY
} from './actions.type'
import {
  SET_VEHICLE_DETAILS,
  SET_DRIVER_DETAILS,
  SET_FUEL_HISTORY,
  SET_MAINTENANCE_HISTORY
} from './mutations.type'
import ApiService from '@/services/api.service'

export default {
  // driver detail panel
  async [FETCH_DRIVER_DETAILS](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/driver-details', {
      vehicle: vehicleSlug
    })
    if (response) {
      context.commit(SET_DRIVER_DETAILS, response.data.driver_details)
    } else {
      throw new Error(response.data.errors)
    }
  },
  // vehicle detail panel
  async [FETCH_VEHICLE_DETAILS](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/vehicle-details', {
      vehicle: vehicleSlug
    })
    if (response) {
      context.commit(SET_VEHICLE_DETAILS, response.data.vehicle_details)
    } else {
      throw new Error(response.data.errors)
    }
  },
  // fuel history
  async [FETCH_FUEL_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/fuel', vehicleSlug)
    if (response) {
      // not sure if we need to store these arrays in vuex state
      // context.commit(SET_FUEL_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // maintenance History
  async [FETCH_MAINTENANCE_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/maintenance', vehicleSlug)
    if (response) {
      // not sure if we need to store these arrays in vuex state
      // context.commit(SET_MAINTENANCE_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  }
}
