<template>
    <div class="cart-item">
        <div class="delete" @click="deleteItem(id)">×</div>
        <div class="checkState">
          <label>
          <input
            type="checkbox"
            class="allCheck"
            :checked="isChecked"
            @change="toggleChecked(id)"
          >
          <span class="title"></span>
          </label>
        </div>
        <img :src="img" :alt="title" />
        <div class="cart-item-info-all">
            <div class="cart-item-info">
            <div class="cart-item-title">{{title}}</div>
        </div>
        <div class="cart-item-price-and-actions">
            <div class="cart-item-price">￥{{price | tofix}}</div>
        <div class="cart-item-actions">
            <span class="btn" @click="reduceCartCount(id)">-</span>
            <span class="count">{{count}}</span>
            <span class="btn" @click="addCartCount(id)">+</span>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
import {
  mapMutations, mapGetters, mapState
} from 'vuex'
export default {
  name: 'CartItem',
  props: {
    id: {
      type: Number,
      required: false
    },
    img: {
      type: String,
      required: false
    },
    count: {
      type: Number,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    isChecked: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    ...mapMutations([
      'addCartCount',
      'reduceCartCount',
      'toggleChecked',
      'deleteItem'
    ])
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['getAllCartItem'])
  }
}
</script>

<style lang="scss">
    .cart-item{
        box-sizing: border-box;
        background: white;
        height:  100px;
        display: flex;
        padding: 12px;
        margin: 12px;
        box-shadow: 2px 2px 3px 2px #ccc;
        border-radius: 2px;
        position: relative;
        left: 12px;
        width: 90%;

        .delete{
            position: absolute;
            top: -6px;
            right: -6px;
            width: 16px;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            border: none;
            border-radius: 50%;
            background: #e93636;
            color: white;
            text-indent: 4px;
        }

        &-info-all{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .cart-item-title{
                width: 220px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        &-price-and-actions{
            display: flex;
            justify-content: space-between;
            .cart-item-price{
                color: #e00;
            }
        }

        img{
            height: 100%;
            width: 80px;
        }

        &-info{
            font-size: 14px;
            margin-left: 4px;
        }

        &-actions{
            span{
                display: inline-block;
                height: 18px;
                line-height: 18px;
                text-align: center;
                font-size: 14px;

                &.btn{
                    width:14px;
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                }

                &.count{
                    width: 30px;
                    background: gainsboro;
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

                }
            }
        }
    }

    .checkState{
        position: absolute;
        top: 40%;
        left: -26px;
    }

</style>
