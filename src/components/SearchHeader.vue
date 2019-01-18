<template>
    <div class="search-header">
      <span @click="$router.push('/home')" class="search-header-back">返回</span>
      <form id="search-header-form">
        <input
          type="text"
          class="search-header-input"
          placeholder="搜索商品，发现更多优选"
          v-model="placeholder"
          >
      </form>
      <span class="search-header-buttton" @click="search(placeholder)">搜索</span>
    </div>
</template>

<script>
export default {
  name: 'Searchheader',
  data () {
    return {
      placeholder: ''
    }
  },
  methods: {
    search (v) {
      // console.log(v)
      if (v === '') {
        return
      }
      this.$router.push(`/searchlist/${this.placeholder}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-header{
    display: flex;
    height: 11.5vw;
    background: #fdde4a;
    padding: 0 3vw;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    #search-header-form {
      width: 71%;
      .search-header-input{
        height: 7.6vw;
        line-height: 7.6vw;
        width: 100%;
        font-size: 3.8vw;
        background: url("../assets/search.png") no-repeat 1.73vw center #fff;
        background-size: 8vw auto;
        border: 1px solid #fdde4a;
        border-radius: 5px;
        box-sizing: border-box;
        padding-left:15%;
      }
    }
    &-back, &-buttton{
      height: 100%;
      border: none;
      line-height: 11.5vw;
      width: 11.5vw;
      background: #fdde4a;
      color: #43240c;
      font-size: 4vw;
      text-align: center
    }
}
</style>
