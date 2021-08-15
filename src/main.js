import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store/index'
// 全局清空样式
import './assets/css/normalize.css'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 时间总线注册
Vue.prototype.$bus = new Vue()

axios.defaults.baseURL = 'http://101.133.165.226:3000'
Vue.prototype.$http = axios;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
