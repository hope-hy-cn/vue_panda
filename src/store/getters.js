const getters = {
  getItemPrice ({ cart }) {
    return cart.reduce((total, item) => {
      total += item.count * item.price
      return total
    }, 0)
  },
  getAllCartItem ({ cart }) {
    return cart.filter(item => item.isChecked === true).reduce((total, item) => {
      total += item.count
      return total
    }, 0)
  },
  getTotalPrice ({ cart }) {
    return cart.filter(item => item.isChecked === true).reduce((total, item) => {
      total += item.count * item.price
      return total
    }, 0)
  },
  allCheckState ({ cart }) {
    return cart.every(item => item.isChecked === true)
  },
  getTotalCartCount ({ cart }) {
    // console.log(cart)
    return cart.reduce((total, item) => {
      total += item.count
      return total
    }, 0)
  }
}

export default getters
