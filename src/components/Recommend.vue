<template>
  <div class="recommend">
    <div class="recommend-title">
      <span class="recommend-title-line"></span>
      <span class="recommend-title-text">小编精选，全场特惠 (ง •̀_•́)ง</span>
      <span class="recommend-title-line"></span>
    </div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-immediate-check=false
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <router-link
        tag="li"
        class="recommend-list"
        v-for="(recmd, index) in recommend"
        :key="index"
        :to="{
          name: 'detail',
          params:{
              id:recmd.id,
              }
          }"
      >
        <div class="wrap">
          <div class="recmd-img">
            <img :src="recmd.image" alt="">
          </div>
          <div class="proname">{{recmd.title}}</div>
          <div class="freeShipping">包邮</div>
          <div class="btm">
            <div class="price">￥{{recmd.price}}</div>
            <div class="salenum">{{recmd.saleNum | omitted}}人已买</div>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  name: 'recommend',
  data () {
    return {
      recommend: [],
      page: 0
    }
  },
  methods: {
    loadMore () {
      // console.log(111)
      Indicator.open('加载中…')
      this.loading = true
      this.page += 20
      setTimeout(() => {
        this.$http.getHomeMorePanda(this.page)
          .then(resp => {
            this.recommend = this.recommend.concat(resp.data.data.list.filter((curr) => curr.type === 1))
            // console.log(this.recommend)
            Indicator.close()
          })
        this.loading = true
      }, 1000)
    },
    show () {
      console.log('show me')
    }
  },
  created () {
    this.$http.getHomeMorePanda(this.page)
      .then(resp => {
        this.recommend = this.recommend.concat(resp.data.data.list.filter((curr) => curr.type === 1))
        // console.log(this.recommend)
      })
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  &-title {
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

  ul {
    background-color: #f5f5f5;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .recommend-list {
      height: 64vw;
      width: 50%;
      font-size: 13px;
      margin-bottom: 2vw;
      box-sizing: border-box;
      .wrap {
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #877a73;
        .recmd-img {
          width: 86%;
          height: 64%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .freeShipping {
          text-align: right;
          width: 80%;
        }
        .proname {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          width: 80%;
          height: 10vw;
          line-height: 5vw;
          margin: 5% 0;
          overflow: hidden;
          color: rgba(10, 2, 2, 0.74)
        }
        .btm {
          width: 80%;
          display: flex;
          align-items: center;
          .price {
            color: red;
            font-size: 16px;
            margin-right: 4%;
          }
          .salenum {
            font-size: 12px;
            padding-top: 1vw;
          }
        }
      }
    }
    .recommend-list:nth-of-type(odd) {
      padding-right: 1vw;
    }
    .recommend-list:nth-of-type(even) {
      padding-left: 1vw;
    }
  }
}
</style>
