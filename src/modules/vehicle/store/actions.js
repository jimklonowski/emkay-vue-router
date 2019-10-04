import {
  FETCH_DRIVER_DETAILS,
  FETCH_VEHICLE_DETAILS,
  FETCH_FUEL_HISTORY,
  FETCH_MAINTENANCE_HISTORY,
  FETCH_INVOICE_HISTORY,
  FETCH_LICENSING_HISTORY,
  FETCH_ACCIDENT_HISTORY,
  FETCH_RENTAL_HISTORY,
  FETCH_TOLL_HISTORY,
  FETCH_VIOLATION_HISTORY,
  FETCH_ODOMETER_HISTORY,
  FETCH_DRIVER_HISTORY,
  FETCH_VEHICLE_NOTES
} from './actions.type'
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
      context.commit(SET_FUEL_HISTORY, response.data)
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
      context.commit(SET_MAINTENANCE_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // invoice History
  async [FETCH_INVOICE_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/invoice', vehicleSlug)
    if (response) {
      // not sure if we need to store these arrays in vuex state
      context.commit(SET_INVOICE_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // licensing History
  async [FETCH_LICENSING_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/licensing', vehicleSlug)
    if (response) {
      // not sure if we need to store these arrays in vuex state
      context.commit(SET_LICENSING_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // accident History
  async [FETCH_ACCIDENT_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/accident', vehicleSlug)
    if (response) {
      // not sure if we need to store these arrays in vuex state
      context.commit(SET_ACCIDENT_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // rental History
  async [FETCH_RENTAL_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/rental', vehicleSlug)
    if (response) {
      // not sure if we need to store these arrays in vuex state
      context.commit(SET_RENTAL_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // toll history
  async [FETCH_TOLL_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/toll', vehicleSlug)
    if (response) {
      context.commit(SET_TOLL_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // violation history
  async [FETCH_VIOLATION_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/violation', vehicleSlug)
    if (response) {
      context.commit(SET_VIOLATION_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // odometer history
  async [FETCH_ODOMETER_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/odometer', vehicleSlug)
    if (response) {
      context.commit(SET_ODOMETER_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // driver history
  async [FETCH_DRIVER_HISTORY](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/driver', vehicleSlug)
    if (response) {
      context.commit(SET_DRIVER_HISTORY, response.data)
      return response
    } else {
      debugger
    }
  },
  // vehicle notes
  async [FETCH_VEHICLE_NOTES](context, vehicleSlug) {
    let response = await ApiService.get('/vehicle/notes', vehicleSlug)
    if (response) {
      context.commit(SET_VEHICLE_NOTES, response.data)
      return response
    } else {
      debugger
    }
  }
}
