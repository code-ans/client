import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bulma from './packages/bulma/components'
import loader from './packages/loader/index'

Vue.config.productionTip = false

Vue.use(bulma)

Vue.component('Loader', loader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
