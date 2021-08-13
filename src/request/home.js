import { request } from "./request"
// HOME路由相关请求

// 获取轮播图
export function getBanner () {
  return request({
    url: '/banner?type=0',
  })
}

// 获取最近音乐
export function getLatestSong(){
  return request({
    url:'/personalized/newsong',
  })
}

// 获取推荐歌单
export function GetRecommendPlaylist(limit){
  return request({
    url:'/personalized',
    params: {
      limit
    }
  })
}

