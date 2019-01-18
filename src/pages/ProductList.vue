<template>
    <div class="productlist">
        <mt-header fixed :title="productListName">
          <mt-button @click="$router.back()" slot="left" icon="back"></mt-button>
        </mt-header>
        <ul class="productlist-feat">
          <li
            :class="{
              'red': sorttype === 0
            }"
            @click="sortSearch(0)">默认排序</li>
          <li
            :class="{
              'red': sorttype === 1
            }"
            @click="sortSearch(1)">价格最低</li>
          <li
            :class="{
              'red': sorttype === 2
            }"
            @click="sortSearch(2)">销量最高</li>
        </ul>
        <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check=false
        class="productlist-show"
        >
          <router-link
              tag = "li"
              v-for ="(item, index) in productlist"
              :key = 'index'
              class="productlist-show-prod"
              :to ="{
                name:'detail',
                params:{
                  id:item.id
                }
              }"
          >
            <div class="wrap">
              <div class="productImg">
                <img :src="item.image" alt="">
              </div>
              <div class="productName">{{item.title}}</div>
              <div class="productFreeShipping">包邮</div>
              <div class="product-btm">
                <div class="product-btm-price">￥{{item.price}}</div>
                <div class="product-btm-salenum">{{item.saleNum | omitted}}人已买</div>
              </div>
            </div>
          </router-link>
        </ul>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  name: 'productlist',
  data () {
    return {
      productListName: '',
      productlist: [],
      page: 0,
      sort: 0,
      // sorttype 为当前排序的方式 0：代表默认排序 1：价格最低 2：销售最多
      sorttype: 0
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      this.$http.getProductList(this.$route.params.id, this.page, this.sort)
        .then(resp => {
          this.productlist = resp.data.data.items.list
          this.productListName = resp.data.data.categoryName
        })
    },
    sortSearch (v) {
      this.sorttype = v
      this.page = 0
      this.sort = v
      document.getElementsByClassName('app-main')[0].scrollTop = 0
      this.getlist()
    },
    loadMore () {
      Indicator.open('加载中…')
      this.loading = true
      this.page += 20
      setTimeout(() => {
        this.$http.getProductList(this.$route.params.id, this.page, this.sort)
          .then(resp => {
            this.productlist = this.productlist.concat(resp.data.data.items.list)
            Indicator.close()
          })
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
  .productlist {
    margin-top: 20.5vw;
    overflow: hidden;
    .mint-header{
      background-color: #fdde4a;
      height: 11.5vw;
      color:#000;
    }
    .productlist-feat{
      width: 100%;
      height: 9vw;
      line-height: 9vw;
      position: fixed;
      top: 11.5vw;
      left: 0;
      display: flex;
      font-size: 12px;
      justify-content: space-around;
      border-bottom: 1px solid #dedede;
      color: rgba(10, 2, 2, 0.74);
      background-color: #fff;
    }
    &-show {
      background-color: #f5f5f5;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      &-prod {
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
          .productImg {
            width: 86%;
            height: 64%;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .productFreeShipping {
            text-align: right;
            width: 80%;
          }
          .productName {
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
          .product-btm {
            width: 80%;
            display: flex;
            align-items: center;
            &-price {
              color: red;
              font-size: 16px;
              margin-right: 4%;
            }
            &-salenum {
              font-size: 12px;
              padding-top: 1vw;
            }
          }
        }
      }
      .productlist-show-prod:nth-of-type(odd) {
        padding-right: 1vw;
      }
      .productlist-show-prod:nth-of-type(even) {
        padding-left: 1vw;
      }
    }
  }
  .red {
    color: red;
  }
</style>
