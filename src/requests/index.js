import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'

const ajax = axios.create({
  baseURL: 'http://www.xiongmaoyouxuan.com'
})

// 拦截请求参数
ajax.interceptors.request.use(config => {
  // 显示'加载中…'
  Indicator.open('加载中…')
  return config
})
// 拦截响应
ajax.interceptors.response.use(resp => {
  // 隐藏'加载中…'
  Indicator.close()

  if (resp.data.code === 200) {
    return resp
  } else {
    // 显示一个错误信息，在3s后自动隐藏
    Toast({
      message: '请求出错',
      duration: 3000
    })
  }
})

const myajax = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/121368/'
})

// 拦截请求参数
myajax.interceptors.request.use(config => {
  // 显示'加载中…'
  Indicator.open('加载中…')
  return config
})
// 拦截响应
myajax.interceptors.response.use(resp => {
  // 隐藏'加载中…'
  Indicator.close()

  if (resp.data.code === 200) {
    return resp.data.data
  } else {
    // 显示一个错误信息，在3s后自动隐藏
    Toast({
      message: '请求出错',
      duration: 3000
    })
  }
})

// 获取首页 轮播图/推荐 接口（熊猫优选）
export const getPanda = () => {
  return ajax.get('/api/tab/1?start=0')
}

// 获取首页更多推荐商品
export const getHomeMorePanda = (pages) => {
  return ajax.get(`/api/tab/1/feeds?start=${pages}&sort=0`)
}

// 获取分类左侧菜单
export const getCategory = () => {
  return ajax.get('/api/tabs?sa=')
}

// 获取分类右侧里的详情
export const getCategoryList = (categoryID) => {
  return ajax.get(`/api/tab/${categoryID}?start=0/${categoryID}`)
}

// 获取商品列表
export const getProductList = (productListID, pages, sort) => {
  return ajax.get(`/api/category/${productListID}/items?start=${pages}&sort=${sort}`)
}

// 获取商品详情
export const getProductDetail = (productID) => {
  return ajax.get(`/api/detail?id=${productID}&normal=1&sa=`)
}

// 搜索页的热门搜索
export const getHotSearch = () => {
  return ajax.get('/api/search/home')
}

// 搜索列表的数据接口
export const getSearchList = (keywords, pages, sort) => {
  return ajax.get(`/api/search?word=${keywords}&start=${pages}&sort=${sort}&couponOnly=NaN&minPrice=0&maxPrice=99999`)
}

// 首页的每日排行数据接口
export const getDailyRank = () => {
  return ajax.get('/api/tab/1?start=0')
}

// 活动页的9块9专区数据接口
export const getActivity = (keywords) => {
  return ajax.get(`/api/${keywords}/items?start=0`)
}

// 登录
export const postLogin = (userInfo) => {
  return myajax.post('/api/v1/login', {
    ...userInfo
  })
}
// 验证token
export const postCheckToken = (token) => {
  return myajax.post('/api/v1/checkToken', {
    token
  })
}
