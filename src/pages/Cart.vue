<template>
  <div class="cart">
    <div class="noneItem" v-show="cart.length === 0">
      <p>你的购物车好像有点寂寞o(╥﹏╥)o</p>
      <p>快去逛逛吧~</p>
      <img src="@/assets/shopping.png" alt="">
    </div>
    <CartItem
    v-for="item in cart"
    :key="item.id"
    :id="item.id"
    :price="item.price"
    :count="item.count"
    :title="item.title"
    :isChecked="item.isChecked"
    :img="item.photo[0].url"
  ></CartItem>
    <CartTotalPrice></CartTotalPrice>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import CartItem from '@/components/CartItem'
import CartTotalPrice from '@/components/CartTotalPrice'
export default {
  name: 'cart',
  components: {
    CartItem,
    CartTotalPrice
  },
  computed: {
    ...mapState(['cart'])
  }
}
</script>

<style lang="scss">
  .cart{
    position: relative;

    .noneItem{
      position: absolute;
      width: 300px;
      height: 70px;
      margin: 0;
      top: 200px;
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
      line-height: 30px;
      font-family: "Tahoma";

      img{
        width: 160px;
        height: calculate(1280 / 675);
        margin-top: 30px;
        opacity: .8;
      }
    }
  }
</style>
