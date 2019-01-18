<template>
  <div class="category">
    <div class="category-left-classify">
      <ul class="category-left-classify-siddbar">
        <router-link
          v-for="(category, index) in category"
          tag='li'
          :key='index'
          :to="`/category/${category.id}`"
        >{{category.name}}</router-link>
      </ul>
    </div>
    <div class="category-right-classify">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category',
  beforeRouteEnter (to, form, next) {
    next(vm => {
      const categoryNav = JSON.parse(window.sessionStorage.getItem('panda-category'))
      if (categoryNav) {
        vm.category = categoryNav
        const categorylistID = to.params.categorylistID || categoryNav[0].id
        vm.$router.push({
          name: 'categoryList',
          params: {
            categorylistID
          }
        })
      } else {
        vm.$http.getCategory()
          .then(resp => {
            vm.category = resp.data.data.list.slice(1)
            window.sessionStorage.setItem('panda-category', JSON.stringify(resp.data.data.list.slice(1)))
            vm.$nextTick(() => {
              const categorylistID = to.params.categorylistID || resp.data.data.list.slice(1)[0].id
              vm.$router.push(`/category/${categorylistID}`)
            })
          })
      }
    })
  },
  data () {
    return {
      category: []
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  width: 100%;
  height: 100%;
  &-left-classify {
    width: 24%;
    border-right: 1px solid #b2b2b2;
    overflow-x: hidden;
    margin-top:3px;
    &-siddbar {
      li {
        padding: 14%;
        text-align: center;
        color: #666666;
        font-size:3.7vw;
        border-left: 4px solid #FFF;
      }
    }
    .router-link-exact-active {
      border-left-color:#f6c847;
      background-color: #f5f5f5;
      color: #f6c847;
      transition: 0.5s ease;
    }
  }
  &-right-classify {
    flex: 1;
    height: 100%;
    border-right: 1px solid #b2b2b2;
    overflow-x: hidden;
    background-color: #fff;
  }
}
</style>
