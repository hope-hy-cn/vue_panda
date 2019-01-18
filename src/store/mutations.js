import { Toast } from 'mint-ui'
const mutations = {
  addCartCount (state, id) {
    state.cart = state.cart.map(item => {
      if (item.id === id) {
        item.count += 1
      }
      return item
    })
  },
  reduceCartCount (state, id) {
    state.cart = state.cart.map(item => {
      if (item.id === id && item.count > 1) {
        item.count -= 1
      }
      return item
    })
  },
  addToCart (state, product) {
    const isInCart = state.cart.some(item => item.id === product.id)
    if (isInCart) {
      state.cart.map(item => {
        if (item.id === product.id) {
          item.count += 1
          Toast({
            message: '已加入购物车',
            duration: 700
          })
        }
        return item
      })
    } else {
      state.cart.push({
        ...product,
        count: 1,
        isChecked: false
      })
      Toast({
        message: '添加成功',
        duration: 500
      })
    }
  },
  toggleChecked (state, id) {
    state.cart = state.cart.map(item => {
      if (item.id === id) {
        item.isChecked = !item.isChecked
      }
      return item
    })
  },
  changeAllCheck (state, checked) {
    if (state.cart.length === 0) {

    } else {
      state.cart = state.cart.map(item => {
        item.isChecked = checked
        return item
      })
    }
  },
  deleteItem (state, id) {
    state.cart = state.cart.filter(item => {
      return item.id !== id
    })
  },
  // 登录状态（是否成功登录
  loginSuccess (state) {
    state.isLogin = true
  },
  // 注册状态（是否注册登录）通过参数存储注册用户信息
  registerSuccess (state, registeruser) {
    state.isRegister = true
    state.user.push({
      ...registeruser
    })
  },
  // 退出登陆
  logout (state) {
    state.isLogin = false
    window.localStorage.setItem('user-panda', JSON.stringify([]))
  },

  // 用户信息更新
  updateUserInfo (state) {
    state.userInfo = JSON.parse(window.localStorage.getItem('user-panda'))
  }
}

export default mutations
