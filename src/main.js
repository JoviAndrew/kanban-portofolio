import './firebase'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import VueFire from 'vuefire'

Vue.use(Vuex)
Vue.use(VueFire)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
