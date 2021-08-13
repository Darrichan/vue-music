import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  //  用户详情
   {
    path: '/user/:userdetailid',
    component: User,
    meta: {
        title: '用户详情'
    }
},
]

const router = new VueRouter({
  routes
})

export default router
