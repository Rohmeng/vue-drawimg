import Vue from 'vue'

import drawimgmodal from 'vue-drawimg'

import App from './App.vue'


Vue.config.productionTip = false
Vue.use(drawimgmodal)

new Vue({
  render: h => h(App),
}).$mount('#app')
