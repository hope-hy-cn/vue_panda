<template>
  <div class="search">
    <div class="header">
      <SearchHeader />
    </div>
    <div class="search-header-hot-search">
    <p class="search-header-hot-search-p">热门搜索</p>
      <ul class="search-header-hot-search-ul">
        <router-link
          v-for = "(item, index) in hotName"
          :class = "item.highlight ? 'hot' : 'not-hot'"
          class="search-header-hot-search-li"
          :key = "index"
          tag="li"
          :to="`/searchlist/${item.word}`"
        >{{item.word}}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchHeader from '@/components/SearchHeader'
// console.log(SearchHeader)
export default {
  name: 'search',
  components: {
    SearchHeader
  },
  data () {
    return {
      hotName: []
    }
  },
  created () {
    this.$http.getHotSearch()
      .then(resp => {
        this.hotName = resp.data.data.hotWords
      })
  }
}
</script>

<style lang="scss" scoped>
  .search-header{
    &-back{
      border: none;
      line-height: 11.5vw;
      width: 11.5vw;
      background: #fdde4a;
      color: black;
    }
    &-input{
      height: 8.2vw;
      line-height: 8.2vw;
      width: 54vw;
      font-size: 3.8vw;
      background: url("../assets/search.png") no-repeat 1.73vw center #fff;
      border: 1px solid #fdde4a;
      border-radius: 2vw 2vw 1.73vw 1.73vw;
      padding-left:11.46vw;
      margin-right: 3vw;
    }
  }
  .search-header-hot-search{
    box-sizing: border-box;
    padding: 2vw 2vw;
    &-p{
      color: #877a73;
      font-size: 4vw;
      margin-top: 3vw;
      margin-left: 3vw;
    }
    &-ul{
      margin-top: 2vw;
      display: flex;
      flex-wrap: wrap;
    }
    &-li{
      margin: 1.7vw 2vw;
      height: 7vw;
      line-height: 7vw;
      border: 1px solid #fff;
      border-radius: 5px;
      padding: 0 3vw;
      font-size: 3.7vw;
      background-color: #f5f5f5;
      color: #43240c;
    }
  }
  .hot{
    color: #fa585a;
  }

</style>
