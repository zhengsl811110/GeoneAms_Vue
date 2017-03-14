import Vue from 'vue'
import ElementUI from 'element-ui'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-default/index.css'
import 'assets/css/pagestyle.css'

import App from './app.vue'

Vue.use(ElementUI);
new Vue({
  el: '#app',
  render: h => h(App)
});
