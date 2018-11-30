import Vue from 'vue'
import router from './router'
import loader from './packages/loader/index'

Vue.config.productionTip = false

Vue.component('Loader', loader)

new Vue({
  router,
  render: h => h('router-view')
}).$mount('#app')
