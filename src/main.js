import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 全局清空样式
import './assets/css/normalize.css'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 时间总线注册
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
