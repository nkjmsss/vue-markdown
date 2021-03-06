import { router } from './router'
import App from './App.vue'
import Vue from 'vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
