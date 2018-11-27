import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bulma from './packages/bulma/components'

Vue.config.productionTip = false

Vue.use(Bulma)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
