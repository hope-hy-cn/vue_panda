<template>
  <div class="dailyRanking">
    <div class="rank-and-all">
      <h5>每日排行榜</h5>
      <h5>查看全部 ></h5>
    </div>
    <div class="all-rank-item">
      <div
        class="rank-item"
        v-for="item in rank"
        :key="item.id"
      >
      <div class="rank-item-img">
        <img
          :src="item.image"
          :alt="item.title">
      </div>
      <h5>{{item.title}}</h5>
      <p><span class="symbol">￥</span><span class="price">{{item.price}}</span><span class="mount">{{item.saleNum | omitted}}人已买</span></p>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DailyRanking',
  data () {
    return {
      rank: {}
    }
  },
  created () {
    this.$http.getDailyRank()
      .then(resp => {
        this.rank = resp.data.data.topList
        // console.log(this.rank)
      })
  }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar {
  display: none;
}
.dailyRanking{
  height: 53vw;
  margin-top: 2vw;
  .rank-and-all{
    display: flex;
    justify-content:space-between;
    padding: 3vw 2vw;
    font-size: 3.5vw;
  }
  .all-rank-item{
    display: flex;
    height: 83%;
    overflow: auto;

    .rank-item{
    height: 154px;
    margin: 0 2vw;

    h5{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 105px;
      font-size: 12px;
      color: #877a73;
      margin-top: 2px;
    }

    img{
      width: 105px;
      height: 105px;
    }

    p{
      color: #877a73;
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      .symbol{
        font-size: 12px;
        color: #e00;
      }

      .price{
        color: #e00;
        font-size: 14px;
        position: relative;
        left: -4px;
      }

      .mount{
        font-size: 12px;
      }
    }
  }
  }

}
</style>
