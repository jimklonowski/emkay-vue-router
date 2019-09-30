import { TOGGLE_DRAWER } from './actions.type'
import { TOGGLE_DRAWER_STATE } from './mutations.type'

export default {
  [TOGGLE_DRAWER]: context => {
    context.commit(TOGGLE_DRAWER_STATE)
  }
}
