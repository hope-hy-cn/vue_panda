<template>
  <div class="details">
    <mt-button id="backBtn" @click="$router.back()" slot="left" icon="back"></mt-button>
    <div class="swiper-container" ref="swiperContainer">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in details.photo" :key="index" class="swiper-slide">
          <img :src="item.url"/>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <div class="details-product-price">
      ￥<span class="details-product-price-number">{{details.price}}</span>
    </div>
    <p class="details-product-name">{{details.title}}</p>
    <div class="details-product-msg">
      <div>
        <span>包邮</span>
      </div>
      <div class="details-sales">月销量:{{details.saleNum}}</div>
    </div>

    <div class="product-details">
      <div class="details-product-title">
        <span class="details-product-title-line"></span>
        <span class="details-product-title-text">图文详情 (ง •̀_•́)ง</span>
        <span class="details-product-title-line"></span>
      </div>
      <div
        class="product-details-image"
        v-for="(item, index) in descContentList"
        :key="index"
      >
        <img :src="item.image.url"  />
      </div>
    </div>

    <div class="details-addcart">
      <div class="details-addcart-left">
        <div class="details-addcart-left-item">
          <div class="icon">
            <i class="iconfont" v-html="'&#xe628;'"></i>
          </div>
          <div class="title">收藏</div>
        </div>
        <div class="details-addcart-left-item">
          <div class="icon">
            <i class="iconfont" v-html="'&#xe618;'"></i>
          </div>
          <router-link
            tag="div"
            class="title"
            :to="{
              name:'cart'
            }"
          ><span class="badge">{{getTotalCartCount | cartFix}}</span>
            购物车
          </router-link>
        </div>
      </div>
      <div class="details-addcart-right">
        <div class="details-addcart-right-addcartbtn">
          <mt-button type="default" class="details-addcart-right-addcartbtn-add" @click="addToCart(details)">加入购物车</mt-button>
        </div>
        <div class="details-addcart-right-quickbuy">
          <mt-button type="default" class="details-addcart-right-quickbuy-buy">立即购买</mt-button>
        </div>
      </div>
    </div>
    <!-- <add-success></add-success> -->
  </div>
</template>

<script>
import Swiper from 'swiper'
import addSuccess from '@/components/addSuccess'
import {
  mapGetters,
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'detail',
  data () {
    return {
      details: {},
      descContentList: []
    }
  },
  components: {
    addSuccess
  },
  created () {
    this.$http.getProductDetail(this.$route.params.id)
      .then(resp => {
        this.details = resp.data.data.detail
        this.descContentList = resp.data.data.detail.descContentList.filter((curr) => curr.type === 1)
        this.$nextTick()
          .then(() => {
            this.initSwiper()
          })
      })
  },
  methods: {
    initSwiper () {
      this.$detailsSwiper = new Swiper(this.$refs.swiperContainer, {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      })
    },
    ...mapMutations(['addToCart'])
  },
  computed: {
    ...mapGetters(['getTotalCartCount']),
    ...mapState(['cart'])
  }
}
</script>

<style lang='scss'>
@import "swiper/dist/css/swiper.css";
@font-face {
  font-family: "iconfont"; /* project id 976722 */
  src: url("//at.alicdn.com/t/font_976722_0qvoc9oiszvj.eot");
  src: url("//at.alicdn.com/t/font_976722_0qvoc9oiszvj.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_976722_0qvoc9oiszvj.woff") format("woff"),
    url("//at.alicdn.com/t/font_976722_0qvoc9oiszvj.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_976722_0qvoc9oiszvj.svg#iconfont") format("svg");
}
.details {
  padding-bottom: 25vw;
  overflow: hidden;
  #backBtn {
    background-color: rgba(0,0,0,.5);
    color: #fff;
    z-index: 9999;
    position: fixed;
    top: 4.5vw;
    left: 4.5vw;
    border-radius: 50%;
  }
  .swiper-container {
    width: 100%;
    height: 0;
    padding-top: percentage( 375 / 375 );
    position: relative;
    .swiper-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      img {
        width: 100%;
      }
    }
    .swiper-pagination-bullet-active {
      background-color: rgb(0, 81, 255);
    }
  }
  &-product-price {
    padding: 0 4vw;
    padding-top: 4vw;
    font-size: 3vw;
    color: red;
    font-weight: 600;
    &-number {
      font-size: 7vw;
    }
  }
  &-product-name {
    padding: 0 4vw;
    padding-top: 4vw;
    font-size: 4vw;
    color: #000;
    line-height: 6vw;
  }
  &-product-msg {
    padding: 0 4vw;
    padding-top: 4vw;
    font-size: 4vw;
    display: flex;
    height: 6vw;
    justify-content: space-between;
    span {
      border: 1px solid red;
      border-radius: 5px;
      color: red;
      font-size: 3vw;
      color: red;
    }
    .details-sales {
      color: #c0c0c0;
    }
  }
  .product-details{
    margin-top:7vw;
    text-align: center;
    .details-product-title {
    background-color: #f5f5f5;
    text-align: center;
    line-height: 13vw;
    margin-top: 3vw;
      &-text {
        height: 13vw;
        color: hsla(21,8%,49%,.7);
        font-size: 12px;
      }
      &-text::before, &-text::after {
        content: "";
        width: 0;
        height: 0;
        border: 3px solid #fdde4a;
        transform: rotate(45deg);
        display: inline-block;
        box-sizing: border-box;
        margin-top: -3px;
      }
      &-text::before {
        margin-right:2vw;
      }
      &-text::after {
        margin-left:2vw;
      }
      &-line {
        height: 1px;
        background-color: #fdde4a;
        width: 12%;
        display: inline-block;
        margin-bottom: .6vw;
      }
    }
    &-image{
      width: 100%;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  &-addcart {
    display: flex;
    position: fixed;
    height: 14vw;
    width: 100%;
    bottom: 0;
    border-top: 1px solid #ccc;
    &-left {
      display: flex;
      flex-direction: row;
      background-color: #fff;
      width: 33%;
      height: 100%;
      &-item {
        width: 50%;
        text-align: center;
        > .icon {
          height: 9vw;
          line-height: 9vw;
          > .iconfont {
            font-family: 'iconfont';
            font-size: 5vw;
          }
        }
        > .title {
          font-size: 3.7vw;
        }
      }
    }
    &-right {
      width: 73%;
      display: flex;
      &-addcartbtn {
        height: 100%;
        width: 50%;
        &-add {
          background-color: #404040;
          color: #fff;
          width: 100%;
          height: 100%;
          font-size: 5vw;
          border-radius: 0;
        }
      }
      &-quickbuy {
        height: 100%;
        width: 50%;
        &-buy {
          color: #fff;
          width: 100%;
          height: 100%;
          font-size: 5vw;
          background-color: #ea3529;
          border-radius: 0;
        }
      }
    }
  }
}
.details-addcart-left-item{
  position: relative;
  .badge{
    position: absolute;
    background: #e00;
    color: #f5f5f5;
    min-width: 20px;
    height: 18px;
    border-radius: 8px;
    left: 64%;
    top: 0;
    font-size: 12px;
    line-height: 18px;
  }
}

</style>
