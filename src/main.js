import Vue from 'vue'
import router from './router'
import bulma from './packages/bulma/components'
import loader from './packages/loader/index'

Vue.config.productionTip = false

Vue.use(bulma)

Vue.component('Loader', loader)

new Vue({
  router,
  render: h => h('router-view')
}).$mount('#app')
