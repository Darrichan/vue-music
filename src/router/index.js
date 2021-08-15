import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Singerlist  from '../views/singer/SingerList.vue'
import Singer from '../views/singer/Singer.vue'
import SingerDetails from '../views/singer/SingerDetails.vue'
// 艺人详情页组件子路由 -> 艺人介绍
const artistMessage = () =>
    import ('../views/singer/artist/artistMessage')
    // 艺人详情页组件子路由 -> 艺人热门作品
const hotworks = () =>
    import ('../views/singer/artist/hotworks.vue')
    // 艺人详情页组件子路由 -> 艺人所有专辑
const allAlbum = () =>
    import ('../views/singer/artist/allAlbum.vue')
    // 艺人详情页组件子路由 -> 艺人所有MV
const allMV = () =>
    import ('../views/singer/artist/allMV.vue')
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
  {
    path: '/Singer',
    component: Singer,
    redirect: '/Singer/Singerlist',
    meta: {
      title: '歌手列表'
    },
    // 歌手子路由  -> 歌手列表
    children: [{
      path: 'Singerlist',
      component: Singerlist,
      meta: {
        title: '歌手列表'
      }

    },]
  },
  {
    path: '/SingerDetails/:id',
    component: SingerDetails,
    redirect: '/SingerDetails/:id/hotworks/:id',
    children: [
        // 歌手介绍
        {
            path: 'artistMessage/:SingerId',
            component: artistMessage,
            meta: {
                title: '歌手介绍'
            }
        },
        // 热门作品
        {
            path: 'hotworks/:SingerId',
            component: hotworks,
            meta: {
                title: '热门作品'
            }
        },
        // 所有专辑
        {
            path: 'allAlbum/:SingerId',
            component: allAlbum,
            meta: {
                title: '所有专辑'
            }
        },
        // 所有MV
        {
            path: 'allMV/:SingerId',
            component: allMV,
            meta: {
                title: '所有MV'
            }
        }

    ]
}
]

const router = new VueRouter({
  routes
})

export default router
