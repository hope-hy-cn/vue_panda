import { postLogin } from '../requests'
export default {
  login (store, loginInfo) {
    postLogin(loginInfo)
      .then(resp => {
        window.localStorage.setItem('user-panda', JSON.stringify(resp))
        store.commit('loginSuccess')
        store.commit('updateUserInfo')
      })
  }
}
