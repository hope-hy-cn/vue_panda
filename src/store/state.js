const state = {
  cart: JSON.parse(window.localStorage.getItem('panda-cart')) || [],
  isLogin: false,
  isRegister: false,
  user: JSON.parse(window.localStorage.getItem('usermsg')) || [],
  userInfo: JSON.parse(window.localStorage.getItem('user-panda')) || {}
}

export default state
