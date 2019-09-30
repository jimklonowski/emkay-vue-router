import { TOGGLE_DRAWER_STATE } from './mutations.type'
export default {
  [TOGGLE_DRAWER_STATE]: state => (state.drawerOpen = !state.drawerOpen)
}
