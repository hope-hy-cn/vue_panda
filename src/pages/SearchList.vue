<template>
    <div class="productlist" ref="productlist">
      <div class="productlist-header">
      <PandaHeader
        :headername = "keywords"
      />
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
        </div>
        <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check=false
        class="productlist-show"
        >
          <router-link
              tag = "li"
              v-for = "(item , index) in searchlist"
              :key = 'index'
              class="productlist-show-prod"
              :to = "{
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
import PandaHeader from '@/components/PandaHeader'
export default {
  name: 'searchList',
  components: {
    PandaHeader
  },
  created () {
    this.getlist()
  },
  data () {
    return {
      searchlist: [],
      pages: 0,
      keywords: this.$route.params.keywords,
      sort: 0,
      // sorttype 为当前排序的方式 0：代表默认排序 1：价格最低 2：销售最多
      sorttype: 0
    }
  },
  methods: {
    // 列表获取数据
    getlist () {
      this.$http.getSearchList(this.$route.params.keywords, this.pages, this.sort)
        .then(resp => {
          // console.log(resp.data.data.list)
          this.searchlist = resp.data.data.list
        })
    },
    // 按需求选择排序的方式 0:默认排序 1：价格最低 2：销量最高
    sortSearch (v) {
      this.sorttype = v
      this.pages = 0
      this.sort = v
      document.getElementsByClassName('app-main')[0].scrollTop = 0
      this.getlist()
    },
    loadMore () {
      Indicator.open('加载中…')
      this.loading = true
      this.pages += 40
      setTimeout(() => {
        this.$http.getSearchList(this.$route.params.keywords, this.pages, this.sort)
          .then(resp => {
            this.searchlist = this.searchlist.concat(resp.data.data.list)
          })
      }, 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
  .productlist {
    margin-top: 21vw;
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
      //position: fixed;
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
  .productlist-header {
    position: fixed;
    width: 100%;
    top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
  }
  .red {
    color: red;
  }
  .panda-header {
    justify-content: flex-start!important;
  }
</style>
