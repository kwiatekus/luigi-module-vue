import Vue from 'vue'
import App from './App.vue'
import List from './List.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/list', component: List },
    { path: '/foo', component: App }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
