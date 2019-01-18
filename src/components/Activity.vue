<template>
  <div class="panda-nav">
    <div class="activity">
      <span class="act-title">9块9包邮</span>
      <span class="act-text">保你不吃亏</span>
    </div>
    <div class="activity">
      <div class="activity-small">
        <span class="act-title">超值大额券</span>
        <span class="act-text">优惠直击底价</span>
      </div>
      <div class="activity-small">
        <span class="act-title">年底女装清仓</span>
        <span class="act-text">每日更新</span>
      </div>
    </div>
  </div>
</template>

<script>
import routes from '@/router/routes'
export default {
  name: 'Activity',
  data () {
    return {
      activities: routes
    }
  }
}
</script>

<style lang="scss">
html,body{
  height: 100%;
}
.home{
  display: flex;
  flex-direction: column;
}
.panda-nav{
  display: flex;
  height: 38vw;
  .activity{
  flex: 1;
  height: 38vw;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
    .activity-small{
      height: 50%;
      overflow: hidden;
      &:first-child{
        background: url(//img1.lukou.com/static/p/commodity/img/20181212-235507.png) no-repeat 30vw 0vw;
        background-size: 30%;
        border-bottom: 1px solid #e0e0e0;
      }
      &:last-child{
        background: url(//img1.lukou.com/static/p/commodity/img/20181226-103407.png) no-repeat 30vw 0vw;
        background-size: 30%;
      }
    }
    .act-title{
      font-size: 14px;
      margin-top: 8px;
    }
    .act-text{
      font-size: 12px;
      margin-top: 8px;
      color: orange;
    }
    span{
      display: block;
      padding-left: 10px;
    }
    &:first-child{
      background: url(http://img1.lukou.com/static/p/commodity/img/20181226-103337.gif) no-repeat center 19vw;
      background-size: 50%;
    }
}
}
</style>
