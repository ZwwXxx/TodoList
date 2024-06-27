import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// import './assets/css/global.css'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus=this
  }
}).$mount('#app')
