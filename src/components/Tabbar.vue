<template>
  <ul class="tabbar">
    <li
        v-for="route in tabbarBtn"
        :key="route.name"
        :class="{
          current: $route.fullPath.includes(route.path)
        }"
        @click="toOtherTab(route.path)"
    >
      <span
        class="badge"
        v-if="route.name === 'cart' && cart.length > 0"
      >{{getTotalCartCount | cartFix}}</span>
      <div class="icon">
        <i class="iconfont" v-html="route.meta.icon"></i>
      </div>
      <div class="title">{{route.meta.title}}</div>
    </li>
  </ul>
</template>

<script>
import routes from '@/router/routes'
import {
  mapState, mapGetters
} from 'vuex'
export default {
  data () {
    return {
      tabbarBtn: routes.filter(item => item.meta.isTabbar === true)
    }
  },
  methods: {
    toOtherTab (path) {
      // console.log(path)
      if (this.$route.fullPath.includes(path)) {
        return
      }
      this.$router.push(path)
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['getTotalCartCount'])
  }
}
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 967809 */
    src: url('http://at.alicdn.com/t/font_967809_o32ndt4nulj.eot');
    src: url('http://at.alicdn.com/t/font_967809_o32ndt4nulj.eot?#iefix') format('embedded-opentype'),
    url('http://at.alicdn.com/t/font_967809_o32ndt4nulj.woff') format('woff'),
    url('http://at.alicdn.com/t/font_967809_o32ndt4nulj.ttf') format('truetype'),
    url('http://at.alicdn.com/t/font_967809_o32ndt4nulj.svg#iconfont') format('svg');
  }
.tabbar {
  background-color: #f5f5f5;
  height: 14vw;
  display: flex;

  li {
    text-align: center;
    color: black;
    width: 25%;
    position: relative;

    &.current{
        color: #f6c847;
    }
    > .icon {
      height: 9vw;
      line-height: 9vw;
      > .iconfont {
          font-family: 'iconfont';
          font-size: 4.5vw;
      }
    }
    > .title {
      font-size: 3.5vw;
    }
  }
}
</style>
<style lang="scss">
.badge{
  position: absolute;
  background: #e00;
  color: #f5f5f5;
  min-width: 28px;
  height: 18px;
  border-radius: 8px;
  left: 60%;
  font-size: 12px;
  line-height: 18px;
}
</style>
