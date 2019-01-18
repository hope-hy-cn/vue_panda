const syncCartInfo = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem('panda-cart', JSON.stringify(state.cart))
    window.localStorage.setItem('usermsg', JSON.stringify(state.user))
  })
}

export default [syncCartInfo]
