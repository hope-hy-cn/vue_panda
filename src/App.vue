<template>
  <div class="app">
    <div class="app-header">
      <router-view name="pandaHeader"></router-view>
    </div>
    <div class="app-main">
      <router-view></router-view>
    </div>
    <div class="app-tabbar">
      <router-view name="tabbar"></router-view>
    </div>
  </div>
</template>

<script>
import PandaHeader from './components/PandaHeader'
export default {
  name: 'App',
  components: {
    PandaHeader
  }
}
</script>
<style lang="scss">
@import './styles/normalize.scss';
.app {
  height: 100%;
  display: flex;
  flex-direction: column;

  &-main {
    flex: 1;
    overflow-x: hidden;
  }
}
.app-main::-webkit-scrollbar {display:none}
</style>
