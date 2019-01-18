<template>
  <div class="categoryList">
    <h3 class="categoryList-name">---{{categoryName}}--</h3>
    <ul>
      <router-link
        tag='li'
        class="categoryList-classify"
        v-for = "(categoryListNum, index) in list"
        :key = 'index'
        :to="`/productList/${categoryListNum.url.split('=')[1]}`"
      >
        <img class="categoryList-classify-img" :src="categoryListNum.imageUrl" :alt="categoryListNum.title">
        <div class="categoryList-classify-title">{{categoryListNum.title}}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'categoryList',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData(to.params.categorylistID)
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.getData(to.params.categorylistID)
    next()
  },
  methods: {
    getData (categorylistID) {
      const categorylist = JSON.parse(window.sessionStorage.getItem('panda-categorylist')) || {}
      const categorylistname = JSON.parse(window.sessionStorage.getItem('panda-categorylist-name')) || {}
      if (Object.keys(categorylist).includes(categorylistID.toString())) {
        this.list = categorylist[categorylistID]
        this.categoryName = categorylistname[categorylistID]
      } else {
        this.$http.getCategoryList(categorylistID)
          .then(resp => {
            this.list = resp.data.data.categories
            this.categoryName = resp.data.data.category.name
            categorylist[categorylistID] = resp.data.data.categories
            categorylistname[categorylistID] = resp.data.data.category.name
            window.sessionStorage.setItem('panda-categorylist', JSON.stringify(categorylist))
            window.sessionStorage.setItem('panda-categorylist-name', JSON.stringify(categorylistname))
          })
      }
    }
  },
  data () {
    return {
      categoryName: '',
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .categoryList{
    padding-left: 9%;
    padding-top: 7%;

    &-name{
      text-align: center;
      font-size: 3vw;
      padding-bottom: 7%;
      color: #666666;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .categoryList-classify{
          margin-right: 5%;
          margin-bottom: 10%;
          width: 25%;
          &-img{
            display: block;
            width: 16vw;
            height: 14.5vw;
            margin-bottom: 25%;
          }
          &-title{
            margin-top: 2%;
            text-align: center;
            font-size: 3.7vw;
            color: #737373;
          }
      }
    }
  }
</style>
