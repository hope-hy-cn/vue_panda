<template>
  <div class="panda-home-nav">
    <h2 class="panda-home-nav-h2">今日推荐&nbsp;|</h2>
    <ul class="panda-home-nav-ul">
      <li
        v-for="index in category"
        :key="index.id"
        @click="steptosearch(index.name)"
        class="panda-home-nav-ul-li"
      > {{index.name}}
      </li>
    </ul>
    <span @click="changeisShow">三</span>
    <div
      v-if="isShow"
      class="panda-home-nav-list">
      <p @click="changeisShow" class="panda-home-nav-list-p">全部分类</p>
      <ul class="panda-home-nav-list-ul">
        <li
            v-for = "index in category"
            :key= "index.id"
            class="panda-home-nav-list-ul-li"
            @click="steptosearch(index.name)"
        >
          <div class="panda-home-nav-list-ul-li-div">
            <img
                :src = "index.imageUrl"
                :alt = "index.name"
                class = "panda-home-nav-list-ul-li-div-img">
            <p class="panda-home-nav-list-ul-li-div-p">{{index.name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PandaNav',
  created () {
    this.getcate()
  },
  data () {
    return {
      isShow: false,
      category: []
    }
  },
  methods: {
    changeisShow () {
      this.isShow = !this.isShow
      this.getcate()
    },
    // 获取分类菜单数据
    getcate () {
      const categoryNav = JSON.parse(window.sessionStorage.getItem('panda-category'))
      if (categoryNav) {
        this.category = categoryNav
      } else {
        this.$http.getCategory()
          .then(resp => {
            console.log(resp)
            this.category = resp.data.data.list.slice(1)
            window.sessionStorage.setItem('panda-category', JSON.stringify(resp.data.data.list.slice(1)))
          })
      }
    },
    steptosearch (v) {
      this.$router.push(`/searchlist/${v}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .panda-home-nav {
    padding:  0 4vw;
    display: flex;
    background-color: #fdde4a;
    height: 11.5vw;
    line-height: 11.5vw;
    justify-content: space-between;
    position: relative;
    top: 0;
    color: #43240c;
    font-size: 4vw;
    position: fixed;
    top: 10.5vw;
    left: 0;
    z-index: 999;
    width: 100%;
    box-sizing: border-box;
    &-h2 {
      width: 42vw;
      border-bottom: 3px solid #43240c;
    }
    &-ul {
      -webkit-overflow-scrolling: touch;
      width: 140vw;
      margin-left: 10px;
      margin-right: 4vw;
      overflow: auto;
      display: flex;
      &-li {
        margin: 0 1vw;
        white-space: nowrap;
      }
    }
    .panda-home-nav-list{
      width: 100%;
      height: 130vw;
      background: rgba(0, 0, 0, .4);
      position: absolute;
      z-index: 999;
      top: 0vw;
      left: 0vw;
      &-p{
        height: 11.5vw;
        line-height: 11.5vw;
        background: #fdde4a;
        text-align: center;
        font-size: 4vw;
        color: #877a73;
        background: url('../assets/delete.png') no-repeat 97% center #fdde4a;
        background-size: 5vw 5vw;
      }
      &-ul {
      background: #fff;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
        &-li {
          width: 22vw;
          height: 17vw;
          margin-top: 1vw;
          margin-bottom: 3vw;
            &-div{
              text-align: center;
              height: 17vw;
              width: 22vw;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              &-img {
                height: 12vw;
                width: 12vw;
                margin-bottom: 0;
              }
              &-p {
                height: 4vw;
                line-height: 4vw;
                font-size: 3.5vw;
              }
            }
        }
      }
    }
  }
  .panda-home-nav-list-ul>li{
    margin-bottom: 1vw;
  }
  .panda-home-nav-ul::-webkit-scrollbar {display:none}
</style>
