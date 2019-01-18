<template>
  <div class="activityList">
    <panda-nav></panda-nav>
    <product-list></product-list>
  </div>
</template>

<script>
import PandaNav from '@/components/PandaNav'
import ProductList from '@/pages/ProductList'
export default {
  name: 'ActivityList',
  components: {
    PandaNav,
    ProductList
  },
  created () {
    console.log(this)
    // this.$http.getActivity () {

    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
