import Checkbox from './Checkbox'
import Radio from './Radio'
import { Wait, Waiting } from './Waiting'

export default {
  install (Vue) {
    Vue.component('Checkbox', Checkbox)
    Vue.component('Radio', Radio)

    Vue.prototype.$wait = Wait
    Vue.prototype.$waiting = Waiting
  }
}
