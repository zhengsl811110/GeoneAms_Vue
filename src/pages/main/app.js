import Vue from 'vue'
// import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'assets/css/style.css'
import App from './app.vue'
import {store} from 'config/store'

//注册观察者
import 'config/pubsub'
// Vue.use(VueResource);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
