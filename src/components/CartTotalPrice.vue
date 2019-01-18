<template>
    <div class="CartTotalPrice" v-show="cart.length > 0">
        <label>
          <input
            type="checkbox"
            class="allCheck"
            :checked="allCheckState"
            @change="changeAllCheck($event.target.checked)"
          >
          <span class="title">全选</span>
        </label>
        <p class="allPrice">
          <span class="total">合计:</span>
          <span class="price">￥{{getTotalPrice | tofix}}</span>
        </p>
        <span class="settle">
            去结算({{getAllCartItem}})
        </span>
    </div>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapMutations
} from 'vuex'
export default {
  name: 'CartTotalPrice',
  methods: {
    ...mapMutations(['changeAllCheck'])
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters([
      'getAllCartItem',
      'getTotalPrice',
      'allCheckState'
    ])
  }
}
</script>

<style lang="scss">
    .CartTotalPrice{
        position: fixed;
        width: 100%;
        bottom: 14vw;
        display: flex;
        height: 40px;
        line-height: 40px;
        box-shadow: 0px -3px 10px #ccc inset;
        background: white;

        .allPrice{
            flex: 1;
        }

        .settle{
            width: 25%;
            background: rgb(247, 6, 6);
            color: white;
            font-size: 14px;
            text-align: center;
        }
    }
    .CartTotalPrice,.checkState{
        .allCheck{
            display: none;
        }

        .title{
            color: gray;
            width: 16%;
            margin-left: 5px;
            margin-right: 10px;
            position: relative;
            padding-left: 22px;
            &:before{
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                background-image: url('../assets/cart-before.png');
                background-size: 16px 16px;
                border-radius: 50%;
                left: 0px;
                top: 3px;
            }

            &:after{
                content: '';
                opacity: 0;
                position: absolute;
                width: 16px;
                height: 16px;
                background-image: url('../assets/cart-after.png');
                background-size: 16px 16px;
                border-radius: 50%;
                left: 0px;
                top: 3px;
            }

        }
        .allCheck:checked + .title:after{
            opacity: 1;
            transition: opacity .4s ease;
        }
    }
</style>
