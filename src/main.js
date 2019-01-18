// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入router配置文件
import router from './router'
// 引入Vuex的实例store
import store from './store'

// 引入MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 把所有的请求方法导入并赋值给$http
import * as $http from './requests'
Vue.prototype.$http = $http

Vue.config.productionTip = false

// 全局注册MintUI
Vue.use(MintUI)

const pandaMixin = {
  filters: {
    tofix (val) {
      return val.toFixed(2)
    },
    omitted (val) {
      return val > 10000 ? parseInt(val / 10000) + '.' + parseInt((val % 10000) / 1000) + '万' : val
    },
    cartFix (val) {
      return val > 99 ? 99 + '+' : val
    }
  }
}

Vue.mixin(pandaMixin)

// 全局导航守卫
router.beforeEach((to, from, next) => {
  // 如果是下一步是到个人中心 且没登录 就自动跳转到登录
  if (to.meta.isMine === true && store.state.isLogin === false) {
    // 从本地存储里取出用户信息
    const userInfo = JSON.parse(window.localStorage.getItem('user-panda'))
    if (userInfo && userInfo.token) {
      // 如果本地存储有咱们需要验证的字段
      $http.postCheckToken(userInfo.token)
        .then(resp => {
          if (!resp || resp.errMsg !== 'OK') {
            next({
              name: 'login',
              params: {
                redirect: to.path
              }
            })
          }
          // 同步本地存储里的token
          window.localStorage.setItem('user-panda', JSON.stringify({
            ...userInfo,
            token: resp.token
          }))
          // 更新登录状态
          store.commit('loginSuccess')
          // 进去下一步
          next()
        })
        .catch(err => {
          // 如果没有做全局的ajax状态处理，那么这里需要重新处理错误
          console.log(err)
        })
    }
  }
  // 如果是下一步是到购物车 且没登录 就自动跳转到登录
  if (to.meta.isAuthRequired === true && store.state.isLogin === false) {
    // 从本地存储里取出用户信息
    const userInfo = JSON.parse(window.localStorage.getItem('user-panda'))
    if (userInfo && userInfo.token) {
      // 如果本地存储有咱们需要验证的字段
      $http.postCheckToken(userInfo.token)
        .then(resp => {
          if (!resp || resp.errMsg !== 'OK') {
            next({
              name: 'login',
              params: {
                redirect: to.path
              }
            })
          }
          // 同步本地存储里的token
          window.localStorage.setItem('user-panda', JSON.stringify({
            ...userInfo,
            token: resp.token
          }))
          // 更新登录状态
          store.commit('loginSuccess')
          // 进去下一步
          next()
        })
        .catch(err => {
          // 如果没有做全局的ajax状态处理，那么这里需要重新处理错误
          console.log(err)
        })
    } else {
      next({
        name: 'login',
        params: {
          redirect: to.path
        }
      })
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // Vue的实例加入store后，可在页面的任何地方调用vm.$store
  components: { App },
  template: '<App/>'
})
