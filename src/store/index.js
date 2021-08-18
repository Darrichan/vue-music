import Vue from 'vue'
import Vuex from 'vuex'
import { setSessionStorageItem, getSessionStorageItem } from './storage'

const USERID = "USERID"
const USERTOKEN = "USERTOKEN"
const COOKIE = "COOKIE"

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: getSessionStorageItem(USERID),
    userToken: getSessionStorageItem(USERTOKEN),
    cookie: getSessionStorageItem(COOKIE),
    searchData: [],
  },
  // 同步用mutations
  mutations: {
    // 方法
    setMusicData (state, data) {
      state.musicData = data // 保存userToken
      setSessionStorageItem(MUSICDATA, data) // 调用函数用sessionStorage将userToken持久化
    },
    setUserId (state, data) {
      state.userId = data
      setSessionStorageItem(USERID, data)
    },
    setSearchData(state,data){
      state.searchData = data
    },
    setUserToken (state, data) {
      state.userToken = data
      setSessionStorageItem(USERTOKEN, data)
    },
    setCookie (state, data) {
      state.cookie = data
      setSessionStorageItem(COOKIE, data)
    },
  },
})

export default store
